const httpStatus=require('http-status')
const {Note} =require('../models/notes')
const {addNotes} =require('../services/notes.service')
const {updateNote} =require('../services/notes.service')
const {deleteNote} =require('../services/notes.service')
const {getAllNotes} =require('../services/notes.service')
const notesController={
    
async  addNotes(req, res, next) {
  try {
    const {  title, content } = req.body;

    // Find or create the user based on the email
  
    const note=await addNotes(req.body);
    // Add the note and associate it with the user
 //   const note = await addNotes(user, title, content);
// const note=new Note({title,content,user:req._id});
// const createdNote=await note.save();
    res.json(note);
  } catch (error) {
    next(error);
  }
},

    async updateNoteById(req,res,next){
        try{
            const _id=req.params.id;
           const note=await updateNote(_id,req.body);
           res.json(note);
        }
        catch(error){
            next(error)
        }
    },
    async deleteNoteById(req,res,next){
        try{
            const _id=req.params.id;
           const note=await deleteNote(_id,req.body);
           res.status(httpStatus.OK).json({action:'deleted'})
        }
        catch(error){
            next(error)
        }
    },
    async getAllNotes(req,res,next){
        try{
            const id=req.params.id;
            const notes=await getAllNotes(id);
            res.json(notes);
        }catch(error){
            next(error)
        }
    }
}
module.exports=notesController;