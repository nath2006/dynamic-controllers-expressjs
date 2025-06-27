import dotenv from 'dotenv';
import fs from 'fs';

const env = dotenv.config().parsed;

class ModuleController {

  systemDir = './src/system';
  modelDir = './src/models';

  updateLoadModel = async (req, res) => {
    const { model, endpoint } = req.query;

    //LOAD MODEL
    const filename = `${this.modelDir}/LoadModels.js`;

    const content = await fs.readFileSync(filename, 'utf8');

    if(content.includes(`./${model}.js`)) {
      throw new Error('MODEL_EXISTS');
    }

    let newContent = content.replace('export default app;', '');
    newContent += `import ${model} from './${model}.js';\n`;
    newContent += `app.use('/${endpoint}', DynamicController(${model}));\n\n`;
    newContent +=  `export default app;`;

    await fs.writeFileSync(filename, newContent);
  }

  generateModel = async (req) => {

    const{ model, table } = req.query;
    const {fields} = req.body

    //get template
    const template = `${this.systemDir}/templates/model.js`;
    const content = await fs.readFileSync(template, 'utf8');

    let fieldsStr = JSON.stringify(fields);
    fieldsStr = fieldsStr.replace('{', '{\n\t');
    fieldsStr = fieldsStr.replaceAll('},', '},\n\t');
    fieldsStr = fieldsStr.replaceAll(':', ':\xa0');
    fieldsStr = fieldsStr.replaceAll('}}', '},\n\t"createdAt": {"type":"Number"},\n\t"updateAt": {"type":"Number"}\n},');

    //change filed
    let newContent = content.replace('//FIELDS_IS_HERE', fieldsStr); 

    //change modelname
    newContent = newContent.replace('//MODEL_NAME', model);

    if(table){
      //change table name
      newContent = newContent.replace('//TABLE_NAME', `collection: '${table}'`)
    }

    //model filename
    const filename = `${this.modelDir}/${req.query.model}.js`;

    await fs.writeFileSync(filename, newContent);

    return true;
  }

  createModule = async (req, res,) => {
    try {

      if(!req.query.model){
        throw new Error('MODEL_NAME_REQUIRED')
      }

       if(!req.query.endpoint){
        throw new Error('ENDPOINT_REQUIRED')
      }

      //create file
      await this.generateModel(req);

      //load model&create route
      await this.updateLoadModel(req);

      return res.json({
        status: true,
        message: `Model and route created, you can CRUD`
    });
    } catch (error) {
      return res.json({
        status: false,
        message: error.message
      });
    }
  }
}

export default new ModuleController;
