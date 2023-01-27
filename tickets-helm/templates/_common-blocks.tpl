{{define "mongoURI"}}
- name: MONGO_URI
  value: mongodb://{{.Release.Name}}{{.Values.tickets.env.MONGO_URI}}
{{end}}