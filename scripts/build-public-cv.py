"""Build the public CV from the same approved records as the website.

Requires reportlab. This never reads the private source CV.
"""
import json
from datetime import date
from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import argparse

ROOT = Path(__file__).resolve().parents[1]
def read(name): return json.loads((ROOT / 'src' / 'data' / name).read_text())
profile, cv, papers, talks = map(read, ['profile.json', 'cv.json', 'publications.json', 'talks.json'])
issued = date.fromisoformat(cv['issued']).strftime('%-d %B %Y')
papers.sort(key=lambda p: (p['year'], p['date']), reverse=True)
ink, teal, grey = map(colors.HexColor, ['#002147', '#002147', '#586365'])
args=argparse.ArgumentParser()
args.add_argument('--cjk-font', type=Path)
args=args.parse_args()
if args.cjk_font: pdfmetrics.registerFont(TTFont('NameCJK',str(args.cjk_font)))
styles = {
 'name': ParagraphStyle('name',fontName='Times-Roman',fontSize=29,leading=34,textColor=ink,spaceAfter=8),
 'title': ParagraphStyle('title',fontName='Times-Roman',fontSize=23,leading=28,textColor=ink,spaceAfter=16),
 'h': ParagraphStyle('h',fontName='Times-Roman',fontSize=15,leading=18,textColor=ink,spaceBefore=15,spaceAfter=8,keepWithNext=True),
 'b': ParagraphStyle('b',fontName='Helvetica',fontSize=9.3,leading=13.5,textColor=ink,spaceAfter=5),
 'small': ParagraphStyle('small',fontName='Helvetica',fontSize=8.2,leading=11.4,textColor=grey,spaceAfter=3),
 'meta': ParagraphStyle('meta',fontName='Helvetica-Bold',fontSize=8,leading=12,textColor=teal,spaceAfter=3),
}
def p(text,style='b'): return Paragraph(text,styles[style])
def e(text): return escape(text)
def link(label,url): return f'<a href="{e(url)}" color="#002147">{e(label)}</a>'
def footer(c,d):
 c.saveState(); c.setStrokeColor(colors.HexColor('#d9ddda')); c.line(47,43,A4[0]-47,43)
 c.setFont('Helvetica',8); c.setFillColor(grey)
 c.drawString(47,29,'Weijun Li | Public CV | '+issued)
 c.drawRightString(A4[0]-47,29,str(d.page)); c.restoreState()
story=[p('Weijun Li'+(' <font name="NameCJK" size="17">利伟君</font>' if args.cjk_font else ''),'name'),
 p('Postdoctoral Researcher · Institute of High Energy Physics','meta'),
 p(link(profile['email'],'mailto:'+profile['email'])+' · '+link('feuerbutter.github.io','https://feuerbutter.github.io/'),'small'),
 p('Experimental neutrino physics · Detector reconstruction · Statistical inference','b'),p('Appointments','h')]
for a in cv['appointments']:
 story.append(KeepTogether([p(e(a['dates']),'meta'),p('<b>'+e(a['role'])+'</b> · '+e(a['institution'])),p(e(a['description']),'small'),Spacer(1,5)]))
story.append(p('Education','h'))
for a in cv['education']:
 story.append(KeepTogether([p(e(a['dates']),'meta'),p('<b>'+e(a['degree'])+'</b> · '+e(a['institution'])),p(e(a['detail']),'small'),Spacer(1,5)]))
story.append(p('Grants and awards','h'))
for a in cv['awards']:
 story.append(p('<b>'+e(a['year'])+'</b> · '+e(a['title'])+' · '+e(a['institution']),'small'))
story.extend([PageBreak(),p('Publications and preprints','title')])
for a in papers:
 authors=a['authors']
 display=', '.join(authors[:3])+', et al.' if len(authors)>6 else ', '.join(authors)
 if len(authors)>6 and 'Weijun Li' not in authors[:3]: display+=' (including Weijun Li)'
 display=display.replace('Weijun Li','<b>Weijun Li</b>').replace('W. Li','<b>W. Li</b>')
 label='Preprint' if a['status']=='preprint' else 'Conference proceedings' if a['type']=='proceedings' else 'Published journal article'
 venue=e(a['venue']) + (' '+a['volume'] if a.get('volume') else '') + (', '+a['pages'] if a.get('pages') else '')
 links=[]
 if a.get('doi'): links.append(link('doi:'+a['doi'],'https://doi.org/'+a['doi']))
 if a.get('arxiv'): links.append(link('arXiv:'+a['arxiv'],'https://arxiv.org/abs/'+a['arxiv']))
 story.append(KeepTogether([p('<b>'+e(a['title'])+'</b>'),p(display,'small'),p(venue+' ('+str(a['year'])+') · '+label,'small'),p(' · '.join(links),'small'),Spacer(1,9)]))
story.extend([p('Public software','h'),p(link('QSCMC','https://github.com/feuerbutter/QSCMC')+' · Sequentially constrained Monte Carlo sampling of quantum states.'),p(link('QSam','https://github.com/feuerbutter/QSam')+' · Problem-specific, uncorrelated quantum-state sampling.'),PageBreak(),p('Talks, posters and experience','title')])
for t in talks:
 links=' · '.join(link(x['label'],x['url']) for x in t['links'])
 group=[p(e(t['displayDate'])+' · '+e(t['kind']),'meta'),p('<b>'+e(t['title'])+'</b>'),p(e(t['event']),'small')]
 if links: group.append(p(links,'small'))
 group.append(Spacer(1,3)); story.append(KeepTogether(group))
story.extend([p('Collaborations and detector work','h'),p('GENIE (since July 2023); T2K (since October 2021). SuperFGD assembly and hardware work; training and work as a data-acquisition expert.','small'),p('Scientific computing and languages','h'),p('C++, Python, MATLAB, LaTeX and Linux.','small'),p('; '.join(cv['languages'])+'.','small')])
output=ROOT/'public/cv/Weijun-Li-CV.pdf'; output.parent.mkdir(parents=True,exist_ok=True)
doc=SimpleDocTemplate(str(output),pagesize=A4,rightMargin=47,leftMargin=47,topMargin=42,bottomMargin=56,title='Weijun Li — Public academic CV',author='Weijun Li')
doc.build(story,onFirstPage=footer,onLaterPages=footer)
print(output)
