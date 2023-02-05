{{define "mongoURI"}}
- name: MONGO_URI
  value: mongodb://{{.Values.tickets.env.mongo.USERNAME}}:{{.Values.tickets.env.mongo.PASSWORD}}@{{.Release.Name}}{{.Values.tickets.env.mongo.MONGO_URI}}
{{end}}