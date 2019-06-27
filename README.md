# Sviacam

## Un site internet qui déclenche des événements souris et clavier, à partir de reconnaissance de mouvements depuis la webcam :computer: :camera:

### Pour coder ce projet, j'ai utilisé :  
- **Javascript**
- **Jquery**
- **NodeJs**

### Documentation d'installation : 
1) Ouvrez votre terminal et clonez ce repository.
2) Éxécutez la commande **npm install** dans votre terminal, afin d'installer les modules.
3) Éxécutez la commande **nodemon app.js** afin de lancer l'application.
4) Sur Google, allez sur la route **localhost:3000**.


### Documentation d'utilisation :
1) Commencez par cliquer sur le bouton, le rectangle dans lequel sera analysé vos mouvements apparait.
![Screenshot 2019-06-27 21 22 22 - Copy](https://user-images.githubusercontent.com/30896388/60295351-ccc6da80-9923-11e9-8224-778137da0bcb.png)
2) Choisissez une action qui se déclenchera lors de votre mouvement dans ce rectangle précédent.
![Screenshot 2019-06-27 21 22 37](https://user-images.githubusercontent.com/30896388/60295352-ccc6da80-9923-11e9-8040-4aa1dbabfea2.png)
3) Déterminé la taille et la l'endroit du rectangle.
![Screenshot 2019-06-27 21 22 52 - Copy](https://user-images.githubusercontent.com/30896388/60295354-ccc6da80-9923-11e9-9086-6421835055de.png)
4) Appuyer sur le bouton "Set Threshold" pour sauvegarder les informations.
Les mouvements sont à présents détectés. Allez sur une autre page pour tester l'evement souris ou clavier chosi precedemment (étape 2). Dès que vous entendez un "click", l'évènement est déclenché.
![Screenshot 2019-06-27 21 25 05](https://user-images.githubusercontent.com/30896388/60295355-cd5f7100-9923-11e9-8c07-74b1e6e27b76.png)


## Librairies ou outils utilisés :
1) [KonvaJs](https://konvajs.org/) pour que l'utilisateur puisse déterminer et modifier le rectangle ou sera anaylisé ses mouvements.
2) Le projet [Motion detection in Javascript](https://github.com/beije/motion-detection-in-javascript) réalisé par [Benjamin Horn](https://github.com/beije) pour détécter les mouvements de l'utilisateur. 
3) [Socket.IO](https://socket.io/get-started/chat) pour emettre des évènements à partir des mouvements de l'utilisateur.
4) [RobotJS](http://robotjs.io/docs/) pour lancer les évènements de souris ou de clavier.
