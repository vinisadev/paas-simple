import Docker from 'dockerode';

export const docker = new Docker({
  socketPath: '/var/run/docker.sock'
  // Alternatively, for TCP:
  // host: 'localhost',
  // port: 2375
});