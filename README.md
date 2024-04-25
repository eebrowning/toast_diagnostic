Rx Info Tool -> 

Ideally should be a Chrome extension.
Could just be a front end app on a free host.

Takes guid like postman, but returns options/useful shortcuts

* Location:Address:GUID: block for partner comms (maybe template button for slack/email outreach)
* Google search link for partners based on address
* Orders api check for 3pd orders-> latest of each; date/time
* Auto toggle first inventory item to re-send webhooks
* Shortcut links to toast web settings pages-> sorted by common settings   #rxinfotool


https://thepantry.toasttab.com/sites/experience/community/events/news/11781/the-ultimate-guide-to-hackathon

Project Manager: David
Register Team: 

Check out some presentations!



Mock JSON for frontend building
* OrdersBulk is an array of order objects -> make a list of keys in those objects of useful info for the goal: source:API, diningOption: islike(Grubhub, Doordash, uber eats)




Features: 3 tabs?
* Rx Info
* Orders health check
* Helpful splunks


Rx Info:
* 


Orders health check:
* Last orders from gh/dd/ue
* https://ws-api.toasttab.com/orders/v2/ordersBulk?startDate=2020-07-13T18:00:00.000-0000&endDate=2020-07-13T22:00:00.000-0000 -> then sort by source, dining option-> dining ops might need to be determined programmatically from JSON
* 

Helpful Splunks:
* Pre-structured queries that will link to splunk
* Categories/issues
