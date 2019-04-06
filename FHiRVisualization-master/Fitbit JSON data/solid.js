const $rdf = require('rdflib');
const store = $rdf.graph();

const me = store.sym('https://example.com/alice/card#me');
const profile = me.doc();