import {  auth,db } from "../firebase/firebaseinit";
import Cookies from "js-cookie";
import {useContext, useState, createContext} from 'react';
import {
    collection,
    doc,
    getDoc,
    setDoc,
    addDoc,
    getDocs,
    query,
    where,
    serverTimestamp,
  } from "firebase/firestore";
  import {
    onAuthStateChanged,
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signOut,
    setPersistence,
    browserSessionPersistence,
    inMemoryPersistence,
  } from "firebase/auth";


const FirebaseContext = createContext();

export function useFirebase() {
    return useContext(FirebaseContext);
  }

export function FirebaseProvider({ children }) {
    const [loading, setLoading] = useState(false);
    //const [user, setUser] = useState();

    async function getAnime(id){   
        try {
          const docRef = doc(db, "anime",id);

          const data= await getDoc(docRef);
            
          console.log(data.id);
          if(data.exists()) return data.data();

        } catch (error) {
           console.log(error);
        }
        return false;
    }
    
    async function updateUserLists(details, favourites=0,completed=0, dropped=0,onHold=0, planToWatch=0,watching=0){
       const user= auth.currentUser;
       const prev="-1";
       try{

        const ref= doc(db,"users",user.email);

        if(favourites!=0){
          if(favourites==1){
            await updateDoc(ref, {
              favourites: arrayUnion({
                imageUrl: details.Image_Link,
                title:details.English,
                episodes: details.Episodes,
                genre: details.genre,
                id:details.Id,
              }  )
          });
        }else{
          await updateDoc(ref, {
            favourites: arrayRemove({
              imageUrl: details.Image_Link,
              title:details.English,
              episodes: details.Episodes,
              genre: details.genre,
              id:details.Id,
            }  )
        });  }
        }
         if(completed!=0){
          if(completed==1){
            await updateDoc(ref, {
              completed: arrayUnion({
                imageUrl: details.Image_Link,
                title:details.English,
                episodes: details.Episodes,
                genre: details.genre,
                id:details.Id,
              }  )
          });
        }else{
          await updateDoc(ref, {
            completed: arrayRemove({
              imageUrl: details.Image_Link,
              title:details.English,
              episodes: details.Episodes,
              genre: details.genre,
              id:details.Id,
            }  )
        });  }
        }

         if(dropped!=0){
          if(dropped==1){
            await updateDoc(ref, {
              dropped: arrayUnion({
                imageUrl: details.Image_Link,
                title:details.English,
                episodes: details.Episodes,
                genre: details.genre,
                id:details.Id,
              }  )
          });
        }else{
          await updateDoc(ref, {
            dropped: arrayRemove({
              imageUrl: details.Image_Link,
              title:details.English,
              episodes: details.Episodes,
              genre: details.genre,
              id:details.Id,
            }  )
        });  }
        }
         if(onHold!=0){
          if(onHold==1){
            await updateDoc(ref, {
              onHold: arrayUnion({
                imageUrl: details.Image_Link,
                title:details.English,
                episodes: details.Episodes,
                genre: details.genre,
                id:details.Id,
              }  )
          });
        }else{
          await updateDoc(ref, {
            onHold: arrayRemove({
              imageUrl: details.Image_Link,
              title:details.English,
              episodes: details.Episodes,
              genre: details.genre,
              id:details.Id,
            }  )
        });  }
        }
         if(planToWatch!=0){
          if(planToWatch==1){
            await updateDoc(ref, {
              planToWatch: arrayUnion({
                imageUrl: details.Image_Link,
                title:details.English,
                episodes: details.Episodes,
                genre: details.genre,
                id:details.Id,
              }  )
          });
        }else{
          await updateDoc(ref, {
            planToWatch: arrayRemove({
              imageUrl: details.Image_Link,
              title:details.English,
              episodes: details.Episodes,
              genre: details.genre,
              id:details.Id,
            }  )
        });  }
        }
         if(watching!=0){
          if(watching==1){
            await updateDoc(ref, {
              watching: arrayUnion({
                imageUrl: details.Image_Link,
                title:details.English,
                episodes: details.Episodes,
                genre: details.genre,
                id:details.Id,
              }  )
          });
        }else{
          await updateDoc(ref, {
            watching: arrayRemove({
              imageUrl: details.Image_Link,
              title:details.English,
              episodes: details.Episodes,
              genre: details.genre,
              id:details.Id,
            }  )
        });  }
        }

      }catch(error){
          console.log(error);
      }

    }

    async function getUserData(){
      try {
        const docRef = doc(db, "users",auth.email);

        const data= await getDoc(docRef);
          
        if(data.exists()) return data.data();

      } catch (error) {
         console.log(error);
      }
      return false;

    }

    async function signIn() { 
    try {

      const provider = new GoogleAuthProvider();

      provider.setCustomParameters({
        prompt: "select_account",
        auth_type: "reauthenticate",
      });  
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      //result.user&& setUser(result.user);

      //console.log(auth);
    
      const checkUser= await getDoc(doc(db,"users", result.user.email));

       if(checkUser.data()==undefined){
        
        await setDoc(doc(db, "users",result.user.email), {

          dateJoined: serverTimestamp(),
          username: result.user.displayName,
          email:result.user.email,
          photoUrl: result.user.photoURL,
          favourites:[],
          completed: [],
          watching:[],
          planToWatch:[],
          onHold:[],
          dropped:[],

        })
      }

    } catch (error) {
      console.log(error)
      const errorCode = error.code;
    const errorMessage = error.message;
    
    const credential = GoogleAuthProvider.credentialFromError(error);
    }
  }

  const addComment = async (text, animeId, isReply=false, commentId=null)=>{
    const user= auth.currentUser;

    if(user==undefined) return false;


   if(isReply){
    if(!commentId){ 
      console.log("Please Provide commendId to add Reply !!");
      return null;
    }
    const replyRef = await addDoc(collection(db, "discussion", animeId, 'comments', commentId, 'replies'), {
      isEdited: false,
      text,
      userEmail: user.email,
      userName: user.displayName,
      commentedOn: serverTimestamp(),
      parentId: commentId
    });
    console.log("Reply written with ID: ", replyRef.id);
    return replyRef;
   }

   else{
    console.log(auth.currentUser)
    const commentRef = await addDoc(collection(db, "discussion", animeId, 'comments'), {
      isEdited: false,
      text,
      userEmail: user.email,
      userName: user.displayName,
      commentedOn: serverTimestamp(),
    });
    console.log("Comment written with ID: ", commentRef.id);
    return commentRef;
   }  
  }



  const editComment = async(text,animeId, commentId, replyId=null, isReply=false)=>{

    const user= auth.currentUser;

    if(user==undefined) return false;

    if(isReply){

      if(!commentId || !replyId){
        console.log("Please Provide commendId and replyId !!");
        return null;
      }
      const user= auth.currentUser;

      if(user==undefined) return false;

      const replyRef = doc(db, "discussion", animeId, 'comments', commentId, 'replies', replyId);
      await setDoc(replyRef, { 
      isEdited : true,
      text,
      userEmail: user.email,      
      userName: user.displayName,
      commentedOn: serverTimestamp(),

     }, { merge: true });

     console.log("Reply edited with ID: ", replyRef.id);
     return replyRef;
    }


    else{
      const commentRef = doc(db, "discussion", animeId, 'comments', commentId);
      await setDoc(commentRef, { 
      isEdited : true,
      text,
      userEmail: user.email,      
      userName: user.displayName,
      commentedOn: serverTimestamp(),

     }, { merge: true });

     console.log("Comment edited with ID: ", commentRef.id);
     return commentRef;
    }
  }
   
  async function signout(){
    const auth = getAuth();

    signOut(auth).then(() => {
           // setUser(null);
            console.log("sign out succesful", auth);
      }).catch((error) => {
        // An error happened.
        console.log(error);
      });
  }

  async function getComments( animeId,commentId=undefined,needReplies=false ){
    console.log(animeId);
    try{
      if(needReplies){
        const ref= collection(db,"discussion",animeId,"comments",commentId,"replies");

        const res= await getDocs(ref);

        return res;
      }else{
        const ref= collection(db,"discussion",animeId,"comments");

        const res= await getDocs(ref);

        return res;
      }
    }catch(e){
      console.log(e);
    }

    return false;
  }

  // function getUserCookies() {
  //   const user = Cookies.get("user");
  //   if (user) {
  //     const details = JSON.parse(user);
  //     return { details };
  //   }
  //   return false;
  // }

    const value={
            getAnime,
            signIn,
            addComment,
            editComment,
            signout,
            auth,
            getUserData,
            updateUserLists,
            getComments
        };

    return (
        <FirebaseContext.Provider value={value}>
          {!loading && children}
        </FirebaseContext.Provider>
      );
}

