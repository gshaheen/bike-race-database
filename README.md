# bike race database
 some light analysis of bikepacking races
 all credit for the original data goes to https://dotwatcher.cc/ - a fantastic site to follow along with your favorite bike races alongside real time tracking and great commentary!
 rather than bug the lovely and busy folks over at dotwatcher for their data, I decided to see if I could just get it all myself off their site without the effort of copy/pasting table data from hundreds of different results pages.

 # I am out of practice
 so I used AI. I know what is possible and what *can* be done, but it's been so long since I've sat down with javascript, node, and the entire ecosystem.  I used chatGPT (3.5) to generate a couple of things to get the data I wanted:

 - linkfetch - get all the links from a page
 - gettabledatamultipleurls2 - (I know great name!) after a few prompt iterations (also in this repo), this is the script that pulls all the table data from a list of URLs in urls.txt and then dumps it into a csv. It also prepends each row with the title of the page from which that row was pulled, so we can, in this case, identify which race it is.

I then did a little manual clean up to get where I wanted to be - a spreadsheet with 18,226 rows of results from 289 unique races.