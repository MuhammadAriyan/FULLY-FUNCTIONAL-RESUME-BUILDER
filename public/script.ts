
const skills = document.getElementById('skills') as HTMLDivElement;
const skillButton = document.getElementById('btnS') as HTMLButtonElement;
const expform = document.getElementById('expform') as HTMLDivElement;
const addexp = document.getElementById('addexp') as HTMLButtonElement;
const addskills = document.getElementById('addskills') as HTMLButtonElement;
const skillform = document.getElementById('skillform') as HTMLDivElement;
const formInEdu = document.getElementById('formInEdu') as HTMLDivElement;
const addedu = document.getElementById('addedu') as HTMLButtonElement;
const resumeOutput = document.getElementById('resumeOutput') as HTMLDivElement;
const form = document.getElementById('form') as HTMLFormElement;
const makeform = document.getElementById('makeform');
const pstitle = document.getElementById('pstitle');
const pdfGen = document.getElementById('pdfGen') as HTMLButtonElement;
const addimage = document.getElementById('add-image') as HTMLInputElement
const pfp = document.getElementById('pfp')
let genUrl:boolean = false
let resume :string

const imgLoader = () => {
    
    const addimage = document.getElementById('add-image') as HTMLInputElement
    const pfp = document.getElementById('pfp') as HTMLImageElement
    const file = addimage.files?.[0]
    if(file){        
    const url = URL.createObjectURL(file)
    pfp.src = url as string
    const read = new FileReader();
    read.onload = () => {
        pfp.src = read.result as string; 
        console.log('pfp changed');
        console.log(url);
        
    };
    read.readAsDataURL(file);

    }else{
        console.log("file is false");
        
    }
}

const updateSkillButtonText = () => {
    if (skills.classList.contains('hidden')) {
        skillButton.textContent = 'SHOW SKILLS';
    } else {
        skillButton.textContent = 'HIDE SKILLS';
    }
};

if (skillButton) {
    skillButton.addEventListener('click', () => {
        skills.classList.toggle('hidden');
        updateSkillButtonText();
    });
} else {
    console.error('skillButton element is missing!');
}

const mainExpForm = document.getElementById('mainexpForm')
addexp.addEventListener('click', () => {
        const expformClone = expform.cloneNode(true) as HTMLDivElement;
        mainExpForm?.appendChild(expformClone);
    })

const mainEduForm = document.getElementById('maineduForm')
addedu.addEventListener('click', () => {
      const formInEduClone = formInEdu.cloneNode(true) as HTMLDivElement;
       mainEduForm?.appendChild(formInEduClone);
 });


if (pdfGen) {
    pdfGen.addEventListener('click', () => {
        window.print();
        
    });
}

const mainSkillForm = document.getElementById('mainskillForm') 
addskills.addEventListener('click', () => {
    const skillformClone = skillform.cloneNode(true) as HTMLDivElement;
    mainSkillForm?.appendChild(skillformClone);
    });

const resumeGen = () => {
    imgLoader()
    const Name = (document.getElementById('name') as HTMLInputElement)?.value || '-';
    const fatherName = (document.getElementById('fname') as HTMLInputElement)?.value || '-';
    const email = (document.getElementById('email') as HTMLInputElement)?.value || '-';
    const contact = (document.getElementById('contact') as HTMLInputElement)?.value || '-';
    const address = (document.getElementById('address') as HTMLInputElement)?.value || '-';

    const eduInputs = Array.from(document.querySelectorAll('#formInEdu input')) as HTMLInputElement[];
    const edu = eduInputs.map(input => input.value);

    const workInputs = Array.from(document.querySelectorAll('#expform input')) as HTMLInputElement[];
    const work = workInputs.map(input => input.value);

    const skillInputs = Array.from(document.querySelectorAll('#skillform input')) as HTMLInputElement[];
    const skills = skillInputs.map(input => input.value.trim());
    
    console.log('Name:', Name);
    console.log('Father Name:', fatherName);
    console.log('Email:', email);
    console.log('Contact:', contact);
    console.log('Address:', address);
    console.log('Education:', edu);
    console.log('Work:', work);
    console.log('Skills:', skills);

    const eduJoin = edu.reduce((acc, inp, index) => {
        if ((index + 1) % 4 === 0) {
            acc += inp + '<br>';
        } else {
            acc += inp + ' | ';
        }
        return acc;
    }, '');

    const workJoin = work.reduce((acc, inp, index) => {
        if ((index + 1) % 3 === 0) {
            acc += inp + '<br>';
        } else {
            acc += inp + ' | ';
        }
        return acc;
    }, '');

    const skillJoin = skills.map(inp => `<li>${inp}</li>`).join(' ');

    const allInputs = [Name, fatherName, contact, address, ...edu, ...work, ...skills];
    const isEmpty = allInputs.some(ele => ele.trim() === '');

    console.log('isEmpty:', isEmpty);

    const htmlOfResume = `
        <div class="resume">
            <h2>RESUME</h2>
            <hr>
            <img src="${(document.getElementById('pfp') as HTMLImageElement)?.src}" alt="pfp" id="pfp" class="pfpImg" />
            <h3>PERSONAL INFORMATION</h3>
            <h4>NAME : ${Name}</h4>
            <h4>FATHER NAME : ${fatherName}</h4>
            <h4>EMAIL : ${email}</h4>
            <h4>CONTACT INFO : ${contact}</h4>
            <h4>ADDRESS : ${address}</h4>
            <h3>EDUCATION</h3>
            <h4>${eduJoin}</h4>
            <h3>WORKING EXPERIENCE</h3>
           <h4>${workJoin}</h4>
           <h3>SKILLS</h3>
            <ul>
                ${skillJoin}
            </ul>
        </div>
        <style>
        
     .resume {
       background-size: cover;
       background-position: center;
       background-image: url('bg.jpg');
       padding: 50px;
       overflow: hidden;
   }
    </style>
    `

       if (!isEmpty && resumeOutput && form) {
        resumeOutput.innerHTML = htmlOfResume;
        resume = htmlOfResume
        genUrl = true
        
    localStorage.setItem('resume',resume);
    } else if (resumeOutput) {
        resumeOutput.innerHTML = '<h2>Please fill out all mandatory fields before generating the resume.</h2>';
    } else {
        alert('SOMETHING BAD HAPPENED');
    }
};

const genUrlbtn = document.getElementById("genUrl") as HTMLButtonElement

const UrlGenerate = async() => {
    let ranNum= Math.floor(Math.random()*100000)
    const contact = (document.getElementById('contact') as HTMLInputElement)?.value || '-';
    let userResId = ranNum + contact
    let url = window.location.href +'?resume='+ userResId
    localStorage.setItem('resumeLink',url)
    console.log(url);
    
    window.open(url)
}

genUrlbtn.addEventListener('click',async()=>{
    genUrl? await UrlGenerate(): alert('please generate resume before trying again')
})
const url = localStorage.getItem('resumeLink')
if(window.location.href=== url){
    const resume = localStorage.getItem('resume') 
    document.body.innerHTML = resume ? resume : '<h1>NO RESUME FOUND</h1>'
}