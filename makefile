## Markdown extension (e.g. md, markdown, mdown).
MEXT = md

## All markdown files in the working directory
SRC = $(wildcard *.$(MEXT))

PDFS=$(SRC:.md=.pdf)
HTML=$(SRC:.md=.html)
RV=$(SRC:.md=_reveal.html)

all: $(PDFS) $(HTML) $(RV)

pdf: $(PDFS)
html: $(HTML)
reveal: $(RV)

%.pdf:	%.md
	pandoc -s -S -V geometry:margin=2cm --number-sections --toc -fmarkdown-implicit_figures --latex-engine=pdflatex -o $@ $<

%.html:	%.md
	pandoc --mathjax -s -o $@ $<

%_reveal.html: %.md
	pandoc -t html5 -t revealjs --standalone --section-divs --template=template-revealjs.html -V width="'1300'" -V height="'700'" --slide-level=2 -V slideNumber=\"c/t\" --css custom.css --filter ./node_modules/.bin/mathjax-pandoc-filter -o $@ $<

clean:
	rm -f *.pdf
	rm -f *.html
getreveal:
	rm -rf reveal.js/*
	mkdir reveal.js
	wget https://github.com/hakimel/reveal.js/archive/master.zip
	unzip master.zip
	mv reveal.js-master/* reveal.js
	rm master.zip
	rm -r reveal.js-master
