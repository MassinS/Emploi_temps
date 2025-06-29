import { selectPersonneByEmail } from "../DB/personne.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from 'node:process';

    export const AuthOnePersonne = (req,res)=>{
     
    const {email,password}=req.body;
    let { rememberMe } = req.body;

    if(rememberMe !== true && rememberMe !== false){
      if (rememberMe === undefined) {
        rememberMe = false;
      }
      else if (rememberMe === "true") {
        rememberMe = true;
      }
      else if (rememberMe === "false") {
        rememberMe = false;
      }
      else{
        return res.status(400).json({
          status: "Value Error",
          message: "value of rememeberMe must be either: true or false"
        })
      }
    }

      selectPersonneByEmail(email).then( async (data)=>{
        const response = {
            status: "success",
            message: "Personne trouvé ",
            personne: data,
          };
          if(data===null ) {
        response.status="Error";
        response.message="Email ou mot de passe est incorrect ";
        response.personne=null;
        res.status(401).json(response);
       return;
    }
    const passwordFound =data.password;
    const passwordMatch = await bcrypt.compare(password,passwordFound);
  

    if (!passwordMatch) {
        response.status = "Error";
        response.message = "Email ou mot de passe incorrect";
        response.personne = null;
        res.status(401).json(response); // 401 Unauthorized pour indiquer une erreur d'authentification
        return;
    }
    console.log("Creating JWT With RememberMe SetTo: "+rememberMe+ ` expires in: ${rememberMe? '1d':'1h' }`);
    const token = jwt.sign({ id: data.matricule, email: data.email }, process.env.JWTSecret , { expiresIn: rememberMe? '1d':'1h' }); // Modifier 'votre_clé_secrète' selon votre clé secrète
    response.token = token;
    
    res.cookie("token",token);
     res.status(200).json(response);

      }).catch((err)=>{
        res.status(500).json({
            status:"Error",
            Message:err
        })
        console.log(err)
      }) 

}