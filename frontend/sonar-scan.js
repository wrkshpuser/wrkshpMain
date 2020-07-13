const sonarqubeScanner = require('sonarqube-scanner');
 let server = process.env.backendIP || '54.185.20.134';
sonarqubeScanner(
  {
    serverUrl : 'http://'+server+':9000',
    // token : "e561fc4985104b65ab407f802381bfa914cedb25",
    options: {
      'sonar.projectName': 'awswrkshp-aut-frontend',
      'sonar.projectDescription': 'Mythical Mysfits'
    }
  },
  () => process.exit()
)
