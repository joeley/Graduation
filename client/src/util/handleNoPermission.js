export default function(msg, path){
  Message.warning({
    message:msg,
    center:true
  });
  window.location.href = "/login?redirect=" + path; 
}