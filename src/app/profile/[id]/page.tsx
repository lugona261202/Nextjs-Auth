//this seperate profile page is made so that when user finds profile page for user like profile/123
// where 123 is user it will dynamically get directed for any user id 
export default function UserProfile({params}:any){
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr/>
            <p className="text-4xl">profile page</p>
            <span className="p-2 ml-2 rounded bg-orange-500 text-black">{params.id}</span>
        </div>
    )
}