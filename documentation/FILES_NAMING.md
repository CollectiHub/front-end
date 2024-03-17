# Files naming
In order, to keep project files structure clear and easy to understand, we must follow some rules during files naming.

If your file/folder name have a few words - use **kebab case** for such entities naming.

There is a list of rules, for files naming ending:
1. Names of files, that contains **enums/types/interface** - must end with **'*.models.ts'**.
2. Names of files, that contains **constants** - must end with **'*.constants.ts'**.
3. Name of **service**, that are responsible for **http requests** - must end with **'*-api.service.ts'**.
4. **Adapter files** names - must end with **'*.adapter.ts'**.
5. **Schema files** names - must end with **'*.schemas.ts'**.
6. **Test files** - must end with **'*.spec.ts'**.
7. Files, that contains **rx-js operators** - must end with **'*.operator.ts'** (usually we are doing 1 operator per file).
8. **Facade files** names - must end with **'*.facade.ts'**.
9. **Validator files** names, must end with **'*.validators.ts'**.
10. In case of using **strategy** - such files names, must end with **'*.strategy.ts'**.
11. Names of files, with **mock** for tests or any other purposes - must end with **'*.mock.ts'**.
12. Pages components names shuold end with **'*.page.ts'** (or any other file extension)

**NOTE:** _If there is no rule for your file type - follow framework schematics naming conventions._ 

