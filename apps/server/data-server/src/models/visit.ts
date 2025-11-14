import { createSchemaModel } from '../common';

const visitModel = createSchemaModel('visit', {
    user: Number, // 新的
    returned: Number, // 回访
})

export default visitModel;