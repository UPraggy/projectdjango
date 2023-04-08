const nodeDocumentations =
{

  name: ['JavaScript', 'React', 'React Native', 'WebPack', 'Gulp & Babel', 'Java Basico', 'MongoDb'],

  html: ['JavaScriptBasico', 'react', 'reactNative', 'webpack', 'gulp', 'javaBasico', 'mongodb'],

  img: ['javaScript', 'react', 'react', 'webpack', 'gulp', 'java', 'mongodb']


}


const createNodeDocumentations = (docParam) => {

  docParam.html.forEach((val, i) => {
    $('#documents').append(`<div class="docInd" redirect="./?doc=` + val + `&img=` + docParam.img[i] + `">
        <div class="docIcon" style="background-image: url('/static/documentations/icons/`+ docParam.img[i] + `.png'); ">
        </div>
        <div class="docTitle">`+ docParam.name[i] + `</div>
      </div>`)
  })

  $(".docInd").click((event) => {
    window.location.href = event.target.parentNode.attributes[1].value;
  });
}

createNodeDocumentations(nodeDocumentations)