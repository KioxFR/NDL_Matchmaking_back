
var mysql = require('mysql'); 

var con = mysql.createConnection({
    host: "51.83.255.41",
    user: "debian",
    password: "nuitdelinfo",
    database: "nuitdelinfo"
  });
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!"); 
  });

const tableUser = '';
const tableConcerner = '';



const connexion = (req, resp) => {
  //  resp.header("Access-Control-Allow-Origin", "*");
   // resp.header("Content-Type", "application/json");

   console.log(req.body);
   
    const {login,mdp} = req.body;
    
   con.query("SELECT * FROM"+tableUser+"WHERE login = $1 AND mdp = $2",[login,mdp], (err, result) => {
           if (err)
           {
               resp.status(400).json({"status" : "FAILURE"});
               console.log(err.detail);
           }
           else
           {
               if(result!= null)
               {
                   resp.status(200).json(result.rows);
                   console.log("Success");
               }
               else
               {
                resp.status(200).json({"status": "CONNEXION_FAIL"});
                console.log("Connexion fail");
               }
               
               
           }
   });
};


const inscription = (req, resp) => {
    //  resp.header("Access-Control-Allow-Origin", "*");
     // resp.header("Content-Type", "application/json");
  
     console.log(req.body);
     
      const {login,nom,prenom,age,ville,mdp} = req.body;
      
     con.query("INSERT INTO"+tableUser+"VALUES ($1,$2,$3,$4,$5,$6)",[login,nom,prenom,age,ville,mdp], (err, result) => {
             if (err)
             {
                 resp.status(400).json({"status" : "FAILURE"});
                 console.log(err.detail);
             }
             else
             { 
                resp.status(200).json(result.rows);
                console.log("Success");
             }
     });
  };



  const ajoutPB = (req, resp) => {
    //  resp.header("Access-Control-Allow-Origin", "*");
     // resp.header("Content-Type", "application/json");
  
     console.log(req.body);
     
      const {login,probleme} = req.body;
      
     con.query("INSERT INTO"+tableConcerner+"VALUES ($1,$2,'besoin')",[login,probleme], (err, result) => {
             if (err)
             {
                 resp.status(400).json({"status" : "FAILURE"});
                 console.log(err.detail);
             }
             else
             { 
                resp.status(200).json({"status" : "SUCCES"});
                console.log("Success");
             }
     });
  };  

  const editEtat = (req, resp) => {
    //  resp.header("Access-Control-Allow-Origin", "*");
     // resp.header("Content-Type", "application/json");
  
     console.log(req.body);
     
      const {login,probleme,etat} = req.body;
      
     con.query("UPDATE"+tableConcerner+"SET etat = $3 WHERE login = $1 AND probleme = $2",[login,probleme,etat], (err, result) => {
             if (err)
             {
                 resp.status(400).json({"status" : "FAILURE"});
                 console.log(err.detail);
             }
             else
             { 
                resp.status(200).json({"status" : "SUCCES"});
                console.log("Success");
             }
     });
  };  

  module.exports = {
    connexion,
    inscription,
    ajoutPB,
    editEtat,
};