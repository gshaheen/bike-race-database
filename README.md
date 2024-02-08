# bike race database
## some light analysis of bikepacking races
 all credit for the original data goes to https://dotwatcher.cc/ - a fantastic site to follow along with your favorite bike races alongside real time tracking and great commentary!  

 rather than bug the lovely and busy folks over at dotwatcher for their data, I decided to see if I could just get it all myself off their site without the effort of copy/pasting table data from hundreds of different results pages.

 ## I am out of practice (the process)
 **so I used AI.** 
 
 I know what is possible and what *can* be done, but it's been awhile since I've sat down with javascript, node, and the entire ecosystem.  I used chatGPT (3.5) to generate a couple of things to get the data I wanted:

 - *linkfetch.js* - get all the links from a page
 - *gettabledatamultipleurls2.js* - (I know great name!) after a few prompt iterations (also in this repo), this is the script that pulls all the table data from a list of URLs in urls.txt and then dumps it into a csv. It also prepends each row with the title of the page from which that row was pulled, so we can, in this case, identify which race it is.

 All said and done, 115 lines of code I didn't have to write. Not too shabby.

I then did a little manual clean up to get where I wanted to be - a spreadsheet with 18,226 rows of results from 289 unique races.

Some additional work where AI helped:
- I need to extract the year from the Event name, a quick prompt produced the following formula that worked great:

`=REGEXEXTRACT(A1, "\b\d{4}\b")`

- I needed to format the days/hours/minutes format (for example 15d 5h 25m) to pure minutes so I can do some calculation on it. Turns out that is not a straightforward formula, in the end, this is what works:

`=IFERROR(VALUE(LEFT(K2, FIND("d", K2) - 1)) * 24 * 60 + VALUE(MID(K2, FIND(" ", K2) + 1, FIND("h", K2) - FIND(" ", K2) - 1)) * 60 + VALUE(MID(K2, FIND(" ", K2, FIND(" ", K2) + 1) + 1, FIND("m", K2) - FIND(" ", K2, FIND(" ", K2) + 1) - 1)), "")`

***Amazing*** time saver, writing that all myself would've likely taken hours.

From here, I threw in some additional data about the races - length (both km and mi), and elevation (both km and mi).  After these are added we can easily create charts, graphs, etc using standard spreadsheet functionality.

## The Data
What this whole exercise was about to begin with! I simply wanted to see a few fun things.

>***It's important to note that this data is likely not totally complete nor totally accurate, so please take the following with the appropriate sized grain of salt.***

- Number of Riders Year over Year (gauge of popularity)
- Number of Races Year over Year (yet another gauge of popularity)
- Top 10 Races by Number of Riders
- Top 10 Races by Distance (2024)
- Top 10 Races by Average Finish Time
- Top 10 Riders by Wins (Podium Positions - placing 1,2,3)
- Top 10 Riders by Most Time in Saddle (who spends the most time racing regardless of winning or not?)
- Top 10 Riders by Race Participation

So without further ado:

### Number of Riders Year over Year (gauge of popularity)

![Unique Riders Year over Year](<Unique Riders Year over Year.png>)

### Number of Races Year over Year (yet another gauge of popularity)

![Races Year over Year](<Races Year over Year.png>)

### Top 10 Races by Number of Riders

![Top 10 Events by Riders](<Top 10 Events by Riders.png>)

### Top 10 Races by Distance (2024)

![Top 10 Races by Distance](<Top 10 Races by Distance.png>)

### Top 10 Races by Average Finish Time

![Top 10 Races by Average Finish Time](<Top 10 Races by Average Finish Time.png>)

### Top 10 Riders by Wins (Podium Positions - placing 1,2,3)

![Top 10 Riders by Wins (Podium Position 1st, 2nd, or 3rd)](<Top 10 Riders by Wins (Podium Position 1st, 2nd, or 3rd).png>)

### Top 10 Riders by Most Time in Saddle (who spends the most time racing regardless of winning or not?)

![Top 10 Riders by Most Minutes in Saddle](<Top 10 Riders by Most Minutes in Saddle.png>)

### Top 10 Riders by Race Participation

![Top 10 Riders by Race Participation](<Top 10 Riders by Race Participation.png>)

# I'm sure there are a ton more fun things we can explore in this data

***[So here is the Google Sheet with the full data!](https://docs.google.com/spreadsheets/d/1vDRA_TbIlJr4IyVLpnNMXuvds59qO9mQAmwfzW48INE/edit#gid=551761616)***

Feel free to copy it and fiddle around with the data as you like, I just wanted to share this all with the community.  Would love to see what everyone does with this stuff!

Cheers :beers: ,

George