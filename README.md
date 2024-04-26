David: providing variety of useful splunk queries that can be turned into a template for generating splunk links
Gabriel: Front end appearance, next.js structure, Chrome connection 
Ethan: next.js API, data store(react-query or redux), sorting data efficiently

Rx Info/Integration health check Tool -> support-centered tool for checking for most recent 3pd orders
ideally would help T1/T2 immediately eliminate integrations issues, and to get an idea of how the 'big 3' are functioning at-a-glance.
could be extended to Cx's as a POS button, like the device health checks that currently exist.
Could also provide pre-scripted links to queries w/ splunk -> basically just pasting in the clientID and GUID for the user on queries, sorted by issue (api orders/ loyalty/ gift card)

Ideally should be a Chrome extension.
Could just be a front end app on a free host.

Takes guid like postman, but returns options/useful shortcuts

* Location:Address:GUID: block for partner comms (maybe template button for slack/email outreach)
* Google search link for partners based on address
* Orders api check for 3pd orders-> latest of each; date/time
* Auto toggle first inventory item to re-send webhooks
* Shortcut links to toast web settings pages-> sorted by common settings#rxinfotool


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
* general info, should just be a 'copy rx info' button or something to save space
* formatted block for easy pasting to comms to partners: lx name, address, guid


Orders health check:
* Last orders from gh/dd/ue
* https://ws-api.toasttab.com/orders/v2/ordersBulk?startDate=2020-07-13T18:00:00.000-0000&endDate=2020-07-13T22:00:00.000-0000 -> then sort by source, dining option-> dining ops might need to be determined programmatically from JSON
* 

Helpful Splunks:
* Pre-structured queries that will link to splunk
* Categories/issues

