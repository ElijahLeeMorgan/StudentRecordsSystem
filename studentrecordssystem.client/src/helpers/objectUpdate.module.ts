import httpModule from './http.module';

//TODO: Allow for multiple object deletion.
const objectDeleteModule = (objectType: string, id: number) => {
    //console.log(id);
    httpModule
        .delete(`/${objectType}/Delete?id=${id}`)
        .then(() => { //(response) =>
            //console.log(response);
            window.location.reload();
        })
        .catch((error) => {
            alert("Error")
            console.log(error);
        });
}

export default objectDeleteModule;