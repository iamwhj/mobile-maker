import { createSchemaModel } from '../common';

const ComponentModel = createSchemaModel('category', {
    name: String,
    priority: Number,
})

export default ComponentModel;