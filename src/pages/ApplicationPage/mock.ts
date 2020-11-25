export const mockData = {
  templateVersion: '15',
  createdBy: 'asukhoa',
  name: 'order-service',
  volumes: ['opt/kafka'],
  description: 'service for ...',
  lastRelease: '1.0.1',
  'port-mappings': [
    { port: '8080', value: '8080' },
    { port: '8081', value: '48081' },
  ],
  env: [
    { name: 'POSTGRES_HOST', value: 'postgres' },
    { name: 'POSTGRES_PORT', value: '5432' },
  ],
  instances: [
    {
      id: '1',
      appId: 'order-service',
      templateId: '15',
      version: '1.0.1',
      containerId: '12235123512',
      dateCreated: '23412351245',
      userCreated: 'asukhoa',
      status: 'STARTING',
      alias: 'new feature added',
      url: '127.0.0.1:48080/order-service/swagger-ui.html',
    },
    {
      id: '2',
      appId: 'order-service',
      templateId: '15',
      version: '1.0.2',
      containerId: '12235123512',
      dateCreated: '23412351245',
      userCreated: 'asukhoa',
      status: 'STARTING',
      alias: 'new feature added',
      url: '127.0.0.1:48080/order-service/swagger-ui.html',
    },
    {
      id: '3',
      appId: 'order-service',
      alias: 'new_postgres',
      templateId: '15',
      version: '1.0.3',
      containerId: '12235123512',
      dateCreated: '23412351245',
      userCreated: 'asukhoa',
      status: 'STARTING',
      url: '127.0.0.1:48080/order-service/swagger-ui.html',
    },
    {
      id: '4',
      appId: 'order-service',
      templateId: '15',
      version: '1.0.4',
      containerId: '12235123512',
      dateCreated: '23412351245',
      userCreated: 'asukhoa',
      status: 'STARTING',
      alias: 'new feature added',
      url: '127.0.0.1:48080/order-service/swagger-ui.html',
    },
    {
      id: '5',
      appId: 'order-service',
      templateId: '15',
      version: '1.0.5',
      containerId: '12235123512',
      dateCreated: '23412351245',
      userCreated: 'asukhoa',
      status: 'STARTING',
      alias: 'new feature added',
      url: '127.0.0.1:48080/order-service/swagger-ui.html',
    },
  ],
  versions: ['2.0.0', '2.0.1', '2.0.2', '2.0.3', '2.0.4'],
  history: [
    {
      id: '1',
      date: '02/10/2020',
      user: 'User',
      log: 'created new env var',
    },
    {
      id: '2',
      date: '04/10/2020',
      user: 'User',
      log: 'forward new port',
    },
    {
      id: '3',
      date: '06/10/2020',
      user: 'User',
      log: '...',
    },
    {
      id: '4',
      date: '07/10/2020',
      user: 'User',
      log: 'created new env var',
    },
    {
      id: '5',
      date: '09/10/2020',
      user: 'User',
      log: '...',
    },
  ],
}
