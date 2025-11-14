import { createSchemaModel } from '../common';

const ApplicationModel = createSchemaModel('application', {
    name: String,
    time: String,
    creator: String,
    publisher: String,
    publisher_time: String,
    status: String,
    page: String
})

export default ApplicationModel;