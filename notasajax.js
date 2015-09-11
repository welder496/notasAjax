var najax = require('najax');
var host="localhost";
var port="12345";

module.exports = {

      getNotas: function(callback){
          najax({
            url:'http://'+host+':'+port+'/notas/notas/all',
            type: 'GET',
            success: function(res){
                   callback(res);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                   callback({message:"Erro ao buscar todas as Notas"});
            }
          });
      },

      getFirstNotas: function(callback){
         najax({
             type: "GET",
             url: "http://"+host+":"+port+"/notas/notas/first/28",
             success: function(res){
                          callback(res);
             },
             error: function (XMLHttpRequest, textStatus, errorThrown) {
                          callback({message:"Erro ao buscar todas as Notas"});
             }
         });
      },

      newNota: function(notadata, callback){
          if (notadata instanceof Object){
             najax({
                type: "POST",
                url: "http://"+host+":"+port+"/notas/notas/new",
                data: notadata,
                mimeType: "multipart/form-data",
                cache: false,
                contentType: false,
                processData: false,
                success: function(data){
                      callback(data);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                      callback({message:"Erro ao gravar Nota!!"});
                }
             });
         } else {
             callback({message:"Tipos de dados enviados estão incorretos!!"});
         }
      },

     getNotasLike: function(parameters,callback){
       if (parameters!=""){
          najax({
             type: "GET",
             url: "http://"+host+":"+port+"/notas/notas/like/"+parameters,
             success: function(res){
                 callback(res);
             },
             error: function (XMLHttpRequest, textStatus, errorThrown) {
                 callback({message:"Erro ao pesquisar uma Nota!!"});
             }
          });
       } else {
            callback({message:"Parâmetros não foram definidos!!"});
       }
     },

     deleteNotaById: function(id,callback){
       if (id!="") {
          najax({
             type: "DELETE",
             url: "http://"+host+":"+port+"/notas/notas/id/"+id,
             success: function(res){
                   callback(res);
             },
             error: function (XMLHttpRequest, textStatus, errorThrown) {
                  callback({message:"Erro ao apagar uma nota!!"});
             }
          });
       } else {
                 callback({message:"Não foi possível apagar a Nota: id não informado!!"});
       }
     },

     deleteNotaByCodigo: function(codigo,callback){
       if (codigo!="") {
          najax({
             type: "DELETE",
             url: "http://"+host+":"+port+"/notas/notas/codigo/"+codigo,
             success: function(res){
                   callback(res);
             },
             error: function (XMLHttpRequest, textStatus, errorThrown) {
                   callback({message:"Erro ao buscar nota no banco de dados!!"});
             }
          });
       } else {
             callback({message:"Não foi possível apagar a Nota: código não informado!!"});
       }
     },

     updateNotaByCodigo: function(codigo,notadata,callback){
       if (codigo!="") {
          najax({
             type: "PUT",
             url: "http://"+host+":"+port+"/notas/notas/codigo/"+codigo,
             data: notadata,
             mimeType: "multipart/form-data",
             cache: false,
             contentType: false,
             processData: false,
             success: function(data){
                    callback(data);
             },
             error: function (XMLHttpRequest, textStatus, errorThrown) {
                    callback({message:"Erro ao atualizar Nota no banco de dados!!"});
             }
          });
       } else {
             callback({message:"Código não informado!!"});
       }
     },

    updateNotaById: function(id,notadata,callback){
       if (id!="") {
          najax({
             type: "PUT",
             url: "http://"+host+":"+port+"/notas/notas/id/"+id,
             data: notadata,
             mimeType: "multipart/form-data",
             cache: false,
             contentType: false,
             processData: false,
             success: function(data){
                    callback(data);
             },
             error: function (XMLHttpRequest, textStatus, errorThrown) {
                    callback({message:"Erro ao atualizar Nota no banco de dados!!"});
             }
          });
       } else {
              callback({message:"Id não informado!!"});
       }
     },

     getNotaByCodigoLike: function(codigo,callback){
            if (codigo!="") {
                 najax({
                     type: "GET",
                     url: "http://"+host+":"+port+"/notas/notas/codigo/like/"+codigo,
                     success: function(res){
                          callback(res);
                     },
                     error: function (XMLHttpRequest, textStatus, errorThrown) {
                          callback({message:"Erro ao buscar Nota no banco de dados!!"});
                     }
                 });
            } else {
                callback({message:"Código não informado!!"});
            }
     },

     getNotaByCodigo: function(codigo,callback){
       if (codigo!="") {
          najax({
             type: "GET",
             url: "http://"+host+":"+port+"/notas/notas/codigo/"+codigo,
             success: function(res){
                callback(res);
             },
             error: function (XMLHttpRequest, textStatus, errorThrown) {
                                                    callback({message:"Erro ao buscar Nota no banco de dados!!"});
             }
          });
       } else {
      callback({message:"Código não informado!!"});
       }
     },

     getNotaById: function(id,callback){
       if (id!="") {
          najax({
             type: "GET",
             url: "http://"+host+":"+port+"/notas/notas/id/"+id,
             success: function(res){
                callback(res);
             },
             error: function (XMLHttpRequest, textStatus, errorThrown) {
                                                    callback({message:"Erro ao buscar Nota no banco de dados!!"});
             }
          });
       } else {
              callback({message:"Identificador não informado!!"});
       }
     },

     getNotasByTagsOr: function(tags,callback){
         var vector = tags.split(",");

         //Coleta todos os campos da busca por tag.
         var parameters = "";
         if (vector instanceof Array){
               if (vector[0] != "") {
                     parameters=parameters+"tags="+vector[0].trim();
                     for (var i=1;i<vector.length;i++) {
                        parameters=parameters+"&tags="+vector[i].trim();
                     }
               }
         }

         if (parameters!="") {
               parameters="?"+parameters;
               najax({
                  type: "GET",
                  url: "http://"+host+":"+port+"/notas/notas/tags/or"+parameters,
                  success: function(res){
                        callback(res);
                  },
                  error: function (XMLHttpRequest, textStatus, errorThrown) {
                        callback({message:"Erro ao buscar Nota no banco de dados!!"});
                  }
               });
         } else {
                callback({message:"Parâmetros não foram definidos corretamente!!"});
         }
     },

     getNotasByTagsAnd: function(tags,callback){
        var vector = tags.split(",");

        //Coleta todos os campos da busca por tag.
        var parameters = "";
        if (vector instanceof Array){
           if (vector[0] != "") {
              parameters=parameters+"tags="+vector[0].trim();
              for (var i=1;i<vector.length;i++) {
                 parameters=parameters+"&tags="+vector[i].trim();
              }
           }
        }

       if (parameters!="") {
          parameters="?"+parameters;
          najax({
             type: "GET",
             url: "http://"+host+":"+port+"/notas/notas/tags/and"+parameters,
             success: function(res){
                  callback(res);
             },
             error: function (XMLHttpRequest, textStatus, errorThrown) {
                  callback({message:"Erro ao buscar Nota no banco de dados!!"});
             }
          });
       } else {
               callback({message:"Parâmetros não foram definidos corretamente!!"});
       }
     },

     getNotasByTagsLike: function(tags,callback){

       var vector = tags.split(",");

       //Coleta todos os campos da busca por tag.
       var parameters = "";
       if (vector instanceof Array){
          if (vector[0] != "") {
             parameters=parameters+"tags="+vector[0].trim();
             for (var i=1;i<vector.length;i++) {
                parameters=parameters+"&tags="+vector[i].trim();
             }
          }
       }


       if (parameters!="") {
          parameters="?"+parameters;
          najax({
             type: "GET",
             url: "http://"+host+":"+port+"/notas/notas/tags/like"+parameters,
             success: function(res){
                    callback(res);
             },
             error: function (XMLHttpRequest, textStatus, errorThrown) {
                    callback({message:"Erro ao buscar Nota no banco de dados!!"});
             }
          });
       } else {
              callback({message:"Parâmetros não foram definidos corretamente!!"});
       }
     },

     getDocumentInfo: function(codigo,doc,callback){
             if (doc !="" && codigo!=""){
                    najax({
                         type: "GET",
                         url: "http://"+host+":"+port+"/notas/notas/"+codigo+"/arquivo/"+doc+'/info',
                         success: function(res){
                                callback(res);
                         },
                         error: function (XMLHttpRequest, textStatus, errorThrown){
                                callback({message: "Erro ao buscar arquivo!!"});
                         }
                    });
             } else {
                    callback({message: "Arquivo não foi encontrado!!"});
             }
     },

     getDocument: function(doc,callback){
             if (doc !=""){
                    najax({
                         type: "GET",
                         url: "http://"+host+":"+port+"/arquivos/"+doc,
                         success: function(res){
                                callback("http://"+host+":"+port+"/arquivos/"+doc);
                         },
                         error: function (XMLHttpRequest, textStatus, errorThrown){
                                callback({message: "Erro ao buscar arquivo!!"});
                         }
                    });
             } else {
                    callback({message: "Arquivo não foi encontrado!!"});
             }
     },

     insertDocument: function(doc,callback){
        //TODO - maybe it'll be implemented later
     },

     deleteDocument: function(codigo,doc,callback){
             if ((doc!="") && (codigo!="")) {
                    najax({
                         type: "DELETE",
                         url: "http://"+host+":"+port+"/notas/notas/"+codigo+"/arquivo/"+doc,
                         success: function(res){
                                callback(res);
                         },
                         error: function (XMLHttpRequest, textStatus, errorThrown){
                                callback({message: "Erro ao apagar arquivo!!"});
                         }
                    });
             } else {
                    callback({message: "Arquivo não foi encontrado!!"});
             }
     }

};