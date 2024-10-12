## Source code structure
![Source code](assets/images/code.png?raw=true "Source code")
```bash
src # main app code folder
--- cli     # config of database use to run migration
--- config  # config of app 
--- core    # source code core app 
--- migrations # manual migrations code
--- modules # main business code logic
--- --- locations # business code location tree logic
--- --- --- dtos # the dto code to interact of rest api
--- --- --- services # the business code location
--- --- --- validators # custom validation of module
--- --- --- location.entity.ts # location entity code
--- --- --- location.module.ts # location module code
--- --- --- location.controller.ts # location controller code
--- app.module.ts 
--- main.ts

```