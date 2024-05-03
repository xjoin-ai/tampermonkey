# tampermonkey
### version      2024-05-03
Flow is as follows:
1. On load of the page, set variables/functions and three wait `Interval`
2. After `<builder_interval>`, call `builder` function which then does:
    * Build the button and attach it to the `<body>` of the page.
    * execute `clearInterval` on `builder_interval` to prevent another build.
3. After `<gather_ro_interval>`, call `gather_ro` function which then does:
    * `try` to get the ro # from the page.
    * if unsuccessful, alert user to contact AutoRx support.
    * execute `clearInterval` on `gather_ro_interval` to prevent another gather.
4. After `<gather_miles_interval>`, call `gather_miles` function which then does:
    * `try` to get the mileage from the page.
    * if unsuccessful, log to console and set `mileage` flag to `false`.
    * the only scenario where `clearInterval` is NOT executed against `gather_miles_interval` is if mileage is not entered.
5. User clicks our button (calling `go_autorx`) which does the following:
    * build the url (containing ro and mileage) and open it in a new tab.

Script has a couple environment variables: 
* demo - Set this to `true` for demos. This will use a demo ro # and miles for autorx.
* mileage - Used set a default and to check if mileage has been set on the RO and if it can be retrieved.
* ro - used to set a default and to verify RO is available on the page.
* button_built - Used to ensure only one button is added.
* build_interval - Reruns the `builder` at a set interval until `clearInterval`.
* gather_ro_interval - Reruns the `gather_ro` at a set interval until `clearInterval`.
* gather_miles_interval - Reruns the `gather_miles` at a set interval until `clearInterval`.
