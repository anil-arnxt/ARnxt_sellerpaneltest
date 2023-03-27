import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaCheck } from 'react-icons/fa';


import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import { Metadata } from '../layout/MetaData';





const registerUrl= 'https://4xuh6eqvr6.execute-api.ap-south-1.amazonaws.com/production/register'
const sendotpurl= 'https://4xuh6eqvr6.execute-api.ap-south-1.amazonaws.com/production/sendotp'
const verifyotpurl= 'https://4xuh6eqvr6.execute-api.ap-south-1.amazonaws.com/production/verifyotp'




  




const Registernew = ({history}) => {

  
  const [res, setRes]= useState('')
  const[phoneNo, setNumber]= useState('')
  const [verifyotp, setVerifyOtp]= useState(false)
  const [otp, setOtp]= useState('')
  const [otpshow, setOtpShow]= useState(false)

  const [name, setName]= useState('');
  const [email, setEmail]= useState('');
  const[state, setState]= useState('');
  const[city, setCity]= useState('');
  const[pin, setPin]= useState('');


  const [password, setPassword]= useState('');  
  const [message, setMessage]= useState(null);
  const[verifymessage, setVerifyMessage] = useState(null);
  const [otpmessage,setOtpMessage]= useState(null);
  const [otpverifymessage, setOtpVerifyMessage]= useState(null);
  const [resend, setResend]= useState(false)
  const [verifydisplay, setVerifyDisplay] = useState(false)
  const [color, setColor] = useState(false);
  const [assisted, setAssisted]= useState('');
  const [assistedcheck, setAssistedCheck]= useState(false);

  const [displaybar, setDisplayBar] = useState(false);
  useEffect(()=>{
  
    if(res === 201){
      history.push('/loginnew')
    }
    
  },[history,res])

    let phn =/^\d{10}$/;

    
    const checkclick= (e)=>{
     

   
      
  
     
      if(!assistedcheck){

        
        setAssistedCheck(true)
        
       
      }
      else{
        setAssistedCheck(false)
      }
      
      

    }

const submitHandler=  (event)=>{

  event.preventDefault();
  if(name==='' || email==='' || state==='' || city==='' || pin==='' || password==='' || phoneNo === ''){
      setMessage('All fields are required')
      setTimeout(()=>{
        setMessage('')
      },3000)

      return
  }
  if(!color){
    setMessage('Password not Strong')
    setTimeout(()=>{
      setMessage('')
    },3000)
    return
  }




  if(verifyotp){


  

    const requestBody={
       phoneNo : phoneNo,
      name : name,
      email: email,
      state: state,
      city: city,
      pin: pin,
      assisted: assisted,
      password : password,
     
  }
    
  axios.post(registerUrl, requestBody).then(response=>{
   
       
      swal({
          title: "Registration Successful!",
          text: response.data.message,
          icon:"success",
          button:'OK!'

      })
      setRes(response.status)
      
      
      
     
  }).catch(error=>{
      if(error.response.status===401){
          setMessage(error.response.data.message)
          setTimeout(()=>{
              setMessage('')
            },3000)
        
      }else{
          setMessage('server down! Please try after some time')
      }
  })
} else{
  setMessage('please verify your no')
  setTimeout(()=>{
    setMessage('')
  },3000)
}



  




}


const otpHandler=(event)=>{
event.preventDefault();
if(phoneNo === ''){
  setOtpMessage('Please Enter Your MobileNo')
  setTimeout(()=>{
    setOtpMessage('')

  },3000)
}
if(phoneNo.match(phn)){
  setNumber(phoneNo);
}
 else{
  setOtpMessage('please enter 10 digit no')
  setTimeout(()=>{
    setOtpMessage('')

  },3000)
 }

if(phoneNo !== ''){



const requestBody={
  phoneNo: phoneNo
}



axios.post(sendotpurl, requestBody).then(response=>{
  if(response.request.status === 200){
    setOtpShow(true)
    setResend(true)
 
   
   
  }
 



  

  
 
})
.catch(error=>{

  if(error.response.request.status=== 401){
    
      setOtpMessage(error.response.data.Message)
      setTimeout(()=>{
          setOtpMessage('')
        },3000)
    
  }else{
      setMessage('server down! Please try after some time')
  }
})
}

}

const verifyOtpHandler=(event)=>{
event.preventDefault();
const requestBody={
  phoneNo: phoneNo,
  otp: otp

}

axios.post(verifyotpurl, requestBody).then(response=>{
  if(response.request.status === 200){
    setVerifyOtp(true);
    setOtpShow(false);
    setVerifyDisplay(true);
    setVerifyMessage(true)
    setTimeout(()=>{
      setVerifyMessage('')
    },3000)
    

  }


  

  


  

  
 
}).catch(error=>{

  if(error.response.request.status=== 401){
    
      setOtpVerifyMessage(error.response.data.Message)
      setTimeout(()=>{
          setOtpVerifyMessage('')
        },3000)
    
  }else{
      setMessage('server down! Please try after some time')
  }
})


}

const checkpassword=(e)=>{


if(e.target.value !== ''){
  setDisplayBar(true);
}
else{
  setDisplayBar(false)
}
let passw =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/;

if( (document.getElementById('passfield').value.match(passw))){
setColor(true) 
setPassword(e.target.value);


}
else{
  setColor(false)
 
 

}






}




  let citiesByState = {
    Orissa: ["Angul","Balangir","Balasore","Bargarh","Bhadrak","Boudh","Cuttack","Debagarh","Dhenkanal","Gajapati","Ganjam","Jagatsinghpur","Jajpur","Jharsuguda","Kalahandi","Kandhamal","Kendrapara","Kendujhar","Khordha","Koraput","Malkangiri","Mayurbhanj","Nabarangpur","Nayagarh","Nuapada","Puri","Rayagada","Sambalpur","Subarnapur","Sundergarh"],
    Maharashtra: [
      "Achalpur",	"Ahiri",	"Ahmadnagar",	"Ahmadpur",	"Airoli",	"Ajra",	"Akalkot",	"Akola",	"Akot",	"Alandi",	"Alibag",	"Allapalli",	"Amalner",	"Amarnath",	"Ambad",	"Ambajogai",	"Amravati",	"Amravati Division",	"Anjangaon",	"Anshing",	"Arangaon",	"Artist Village",	"Arvi",	"Ashta",	"Ashti",	"Aurangabad",	"Ausa",	"Badlapur",	"Balapur",	"Ballalpur",	"Baramati",	"Barsi",	"Basmat",	"Beed",	"Bhandara",	"Bhayandar",	"Bhigvan",	"Bhiwandi",	"Bhor",	"Bhudgaon",	"Bhum",	"Bhusaval",	"Bid",	"Biloli",	"Boisar",	"Borivli",	"Buldana",	"Chakan",	"Chalisgaon",	"Chanda",	"Chandor",	"Chandrapur",	"Chandur",	"Chandur Bazar",	"Chicholi",	"Chikhli",	"Chinchani",	"Chiplun",	"Chopda",	"Dabhol",	"Dahanu",	"Darwha",	"Daryapur",	"Dattapur",	"Daulatabad",	"Daund",	"Dehu",	"Deolali",	"Deoli",	"Deulgaon Raja",	"Dharangaon",	"Dharmabad",	"Dharur",	"Dhule",	"Dhulia",	"Diglur",	"Digras",	"Dombivli",	"Dondaicha",	"Dudhani",	"Durgapur",	"Erandol",	"Faizpur",	"Gadchiroli",	"Gadhinglaj",	"Gangakher",	"Gangapur",	"Gevrai",	"Ghatanji",	"Ghoti Budrukh",	"Ghugus",	"Gondiya",	"Goregaon",	"Guhagar",	"Hadgaon",	"Harnai",	"Hinganghat",	"Hingoli",	"Hirapur Hamesha",	"Ichalkaranji",	"Igatpuri",	"Indapur",	"Jaisingpur",	"Jalgaon",	"Jalgaon Jamod",	"Jalna",	"Jawhar",	"Jejuri",	"Jintur",	"Junnar",	"Kagal",	"Kalamb",	"Kalamnuri",	"Kalas",	"Kalmeshwar",	"Kalundri",	"Kalyan",	"Kamthi",	"Kandri",	"Kankauli",	"Kannad",	"Karad",	"Karanja",	"Karjat",	"Karmala",	"Kati",	"Katol",	"Khadki",	"Khamgaon",	"Khapa",	"Kharakvasla",	"Khed",	"Khetia",	"Khopoli",	"Khuldabad",	"Kinwat",	"Kodoli",	"Kolhapur",	"Kondalwadi",	"Kopargaon",	"Koradi",	"Koregaon",	"Koynanagar",	"Kudal",	"Kurandvad",	"Kurduvadi",	"Lanja",	"Lasalgaon",	"Latur",	"Lohogaon",	"Lonar",	"Lonavla",	"Mahabaleshwar",	"Mahad",	"Maindargi",	"Majalgaon",	"Makhjan",	"Malegaon",	"Malkapur",	"Malvan",	"Manchar",	"Mangrul Pir",	"Manmad",	"Manor",	"Mansar",	"Manwat",	"Matheran",
    ],
    
    AndraPradesh:[
     "Addanki",	"Adoni",	"Akasahebpet",	"Akividu",	"Akkarampalle",	"Amalapuram",	"Amudalavalasa",	"Anakapalle",	"Anantapur",	"Atmakur",	"Attili",	"Avanigadda",	"Badvel",	"Banganapalle",	"Bapatla",	"Betamcherla",	"Bhattiprolu",	"Bhimavaram",	"Bhimunipatnam",	"Bobbili",	"Challapalle",	"Chemmumiahpet",	"Chilakalurupet",	"Chinnachowk",	"Chipurupalle",	"Chirala",	"Chittoor",	"Chodavaram",	"Cuddapah",	"Cumbum",	"Darsi",	"Dharmavaram",	"Dhone",	"Diguvametta",	"East Godavari",	"Elamanchili",	"Ellore",	"Emmiganur",	"Erraguntla",	"Etikoppaka",	"Gajuwaka",	"Ganguvada",	"Gannavaram",	"Giddalur",	"Gokavaram",	"Gorantla",	"Govindapuram,Chilakaluripet,Guntur",	"Gudivada",	"Gudlavalleru",	"Gudur",	"Guntakal Junction",	"Guntur",	"Hindupur",	"Ichchapuram",	"Jaggayyapeta",	"Jammalamadugu",	"Kadiri",	"Kaikalur",	"Kakinada",	"Kalyandurg",	"Kamalapuram",	"Kandukur",	"Kanigiri",	"Kankipadu",	"Kanuru",	"Kavali",	"Kolanukonda",	"Kondapalle",	"Korukollu",	"Kosigi",	"Kovvur",	"Krishna",	"Kuppam",	"Kurnool",	"Macherla",	"Machilipatnam",	"Madanapalle",	"Madugula",	"Mandapeta",	"Mandasa",	"Mangalagiri",	"Markapur",	"Nagari",	"Nagireddipalli",	"Nandigama",	"Nandikotkur",	"Nandyal",	"Narasannapeta",	"Narasapur",	"Narasaraopet",	"Narasingapuram",	"Narayanavanam",	"Narsipatnam",	"Nayudupet",	"Nellore",	"Nidadavole",	"Nuzvid",	"Ongole",	"Pakala",	"Palakollu",	"Palasa",	"Palkonda",	"Pallevada",	"Palmaner",	"Parlakimidi",	"Parvatipuram",	"Pavuluru",	"Pedana",	"pedda nakkalapalem",	"Peddapuram",	"Penugonda",	"Penukonda",	"Phirangipuram",	"Pippara",	"Pithapuram",	"Polavaram",	"Ponnur",	"Ponnuru",	"Prakasam",	"Proddatur",	"Pulivendla",	"Punganuru",	"Puttaparthi",	"Puttur",	"Rajahmundry",	"Ramachandrapuram",	"Ramanayyapeta",	"Ramapuram",	"Rampachodavaram",	"Rayachoti",	"Rayadrug",	"Razam",	"Razampeta",	"Razole",	"Renigunta",	"Repalle",	"Salur",	"Samalkot",	"Sattenapalle",	"Singarayakonda",	"Sompeta",	"Srikakulam",	"Srisailain",	"Suluru",	"Tadepalle",	"Tadepallegudem",	"Tadpatri",	"Tanuku",	"Tekkali",	"Tirumala",	"Tirupati",	"Tuni",	"Uravakonda",	"vadlamuru",	"Vadlapudi",	"Venkatagiri",	"Vepagunta",	"Vetapalem",	"Vijayawada",	"Vinukonda",	"Visakhapatnam",	"Vizianagaram",	"Vizianagaram District",	"Vuyyuru",	"West Godavari",	"Yanam",	"Yanamalakuduru",	"Yarada"

    ],
    Bihar:[
      "Amarpur",	"Araria",	"Arrah",	"Arwal",	"Asarganj",	"Aurangabad",	"Bagaha",	"Bahadurganj",	"Bairagnia",	"Baisi",	"Bakhtiyarpur",	"Bangaon",	"Banka",	"Banmankhi",	"Bar Bigha",	"Barauli",	"Barh",	"Barhiya",	"Bariarpur",	"Baruni",	"Begusarai",	"Belsand",	"Bettiah",	"Bhabhua",	"Bhagalpur",	"Bhagirathpur",	"Bhawanipur",	"Bhojpur",	"Bihar Sharif",	"Bihariganj",	"Bikramganj",	"Birpur",	"Buddh Gaya",	"Buxar",	"Chakia",	"Chapra",	"Chhatapur",	"Colgong",	"Dalsingh Sarai",	"Darbhanga",	"Daudnagar",	"Dehri",	"Dhaka",	"Dighwara",	"Dinapore",	"Dumra",	"Dumraon",	"Fatwa",	"Forbesganj",	"Gaya",	"Ghoga",	"Gopalganj",	"Hajipur",	"Hilsa",	"Hisua",	"Islampur",	"Jagdispur",	"Jahanabad",	"Jamalpur",	"Jamui",	"Jaynagar",	"Jehanabad",	"Jha-Jha",	"Jhanjharpur",	"Jogbani",	"Kaimur District",	"Kasba",	"Katihar",	"Khagaria",	"Khagaul",	"Kharagpur",	"Khusropur",	"Kishanganj",	"Koath",	"Koelwar",	"Lakhisarai",	"Lalganj",	"Luckeesarai",	"Madhepura",	"Madhipura",	"Madhubani",	"Maharajgani",	"Mairwa",	"Maner",	"Manihari",	"Marhaura",	"Masaurhi Buzurg",	"Mohiuddinnagar",	"Mokameh",	"Monghyr",	"Mothihari",	"Munger",	"Murliganj",	"Muzaffarpur",	"Nabinagar",	"Nalanda",	"Nasriganj",	"Naugachhia",	"Nawada",	"Nirmali",	"Pashchim Champaran",	"Patna",	"Piro",	"Pupri",	"Purba Champaran",	"Purnia",	"Rafiganj",	"Raghunathpur",	"Rajgir",	"Ramnagar",	"Raxaul",	"Revelganj",	"Rohtas",	"Rusera",	"Sagauli",	"Saharsa",	"Samastipur",	"Saran",	"Shahbazpur",	"Shahpur",	"Sheikhpura",	"Sheohar",	"Sherghati",	"Silao",	"Sitamarhi",	"Siwan",	"Supaul",	"Teghra",	"Tekari",	"Thakurganj",	"Vaishali",	"Waris Aliganj",
    ],
    Delhi: [
      "Alipur",	"Bawana",	"Central Delhi",	"Delhi",	"Deoli",	"East Delhi",	"Karol Bagh",	"Najafgarh",	"Nangloi Jat",	"Narela",	"New Delhi",	"North Delhi",	"North East Delhi",	"North West Delhi",	"Pitampura",	"Rohini",	"South Delhi",	"South West Delhi",	"West Delhi",
    ],
    Gujarat:[
      "Abrama",	"Adalaj",	"Ahmedabad",	"Ahwa",	"Amod",	"Amreli",	"Amroli",	"Anand",	"Anjar",	"Ankleshwar",	"Babra",	"Bagasara",	"Bagasra",	"Banas Kantha",	"Bantva",	"Bardoli",	"Bedi",	"Bhachau",	"Bhanvad",	"Bharuch",	"Bhavnagar",	"Bhayavadar",	"Bhuj",	"Bilimora",	"Bilkha",	"Borsad",	"Botad",	"Chaklasi",	"Chalala",	"Chanasma",	"Chhala",	"Chhota Udepur",	"Chikhli",	"Chotila",	"Dabhoi",	"Dahegam",	"Dahod",	"Dakor",	"Damnagar",	"Dangs (India)",	"Dayapar",	"Delvada",	"Delwada",	"Devbhumi Dwarka",	"Devgadh Bariya",	"Dhandhuka",	"Dhanera",	"Dharampur",	"Dhari",	"Dhola",	"Dholka",	"Dhoraji",	"Dhrangadhra",	"Dhrol",	"Dhuwaran",	"Disa",	"Dohad",	"Dungarpur",	"Dwarka",	"Gadhada",	"Gandevi",	"Gandhidham",	"Gandhinagar",	"Gariadhar",	"Ghogha",	"Gir Somnath",	"Godhra",	"Gondal",	"Halol",	"Halvad",	"Hansot",	"Harij",	"Himatnagar",	"Jalalpore",	"Jalalpur",	"Jambusar",	"Jamnagar",	"Jasdan",	"Jetalsar",	"Jetpur",	"Jhulasan",	"Jodhpur",	"Jodia",	"Jodiya Bandar",	"Junagadh",	"Kachchh",	"Kadi",	"Kadod",	"Kalavad",	"Kalol",	"Kandla",	"Kanodar",	"Kapadvanj",	"Karamsad",	"Kathor",	"Katpur",	"Kavant",	"Kawant",	"Keshod",	"Khambhalia",	"Khambhat",	"Kheda",	"Khedbrahma",	"Kheralu",	"Kodinar",	"Kosamba",	"Kundla",	"Kutch district",	"Kutiyana",	"Lakhtar",	"Lalpur",	"Lathi",	"Limbdi",	"Lunavada",	"Mahemdavad",	"Mahesana",	"Mahudha",	"Malpur",	"Manavadar",	"Mandal",	"Mandvi",	"Mandvi (Surat)",	"Mangrol",	"Mansa",	"Meghraj",	"Mehsana",	"Mendarda",	"Modasa",	"Morbi",	"Morva (Hadaf)",	"Morwa",	"Mundra",	"Nadiad",	"Naliya",	"Narmada",	"Naroda",	"Navsari",	"Okha",	"Olpad",	"Paddhari",	"Padra",	"Palanpur",	"Palitana",	"Paliyad",	"Panch Mahals",	"Panchmahal district",	"Pardi",	"Parnera",	"Patan",	"Pavi Jetpur",	"Petlad",	"Porbandar",	"Radhanpur",	"Rajkot",	"Rajpipla",	"Rajula",	"Ranavav",	"Rapar",	"Roha",	"Sabar Kantha",	"Sachin",	"Salaya",	"Sanand",	"Sankheda",	"Sarkhej",	"Savarkundla",	"Sayla",	"Shahpur",	"Shivrajpur",	"Siddhpur",	"Sihor",	"Sikka",	"Sinor",	"Sojitra",	"Songadh",	"Surat",	"Surendranagar",	"Talaja",	"Tankara",	"Tapi",	"Than",	"Thangadh",	"Tharad",	"Thasra",	"The Dangs",	"Umrala",	"Umreth",	"Un",	"Una",	"Unjha",	"Upleta",	"Utran",	"Vadnagar",	"Vadodara",	"Vaghodia",	"Vallabh Vidyanagar",	"Vallabhipur",	"Valsad",	"Vansda",	"Vapi",	"Vartej",	"Vasa",	"Vaso",	"Vejalpur",	"Veraval",	"Vijapur",	"Vinchhiya",	"Vinchia",	"Virpur",	"Visavadar",	"Visnagar",	"Vyara",	"Wadhai",	"Wadhwan",	"Waghai",	"Wankaner",
    ],
     Haryana: [
      "Ambala",	"Asandh",	"Ateli Mandi",	"Bahadurgarh",	"Bara Uchana",	"Barwala",	"Bawal",	"Beri Khas",	"Bhiwani",	"Bilaspur",	"Buriya",	"Charkhi Dadri",	"Chhachhrauli",	"Dabwali",	"Dharuhera",	"Ellenabad",	"Faridabad",	"Faridabad District",	"Farrukhnagar",	"Fatehabad",	"Fatehabad District",	"Firozpur Jhirka",	"Gharaunda",	"Gohana",	"Gorakhpur",	"Gurgaon",	"Hansi",	"Hasanpur",	"Hisar",	"Hodal",	"Inda Chhoi",	"Indri",	"Jagadhri",	"Jakhal",	"Jhajjar",	"Jind",	"Kaithal",	"Kalanaur",	"Kalanwali",	"Kanina Khas",	"Karnal",	"Kharkhauda",	"Kheri Sampla",	"Kurukshetra",	"Ladwa",	"Loharu",	"Maham",	"Mahendragarh",	"Mandholi Kalan",	"Mustafabad",	"Narayangarh",	"Narnaul",	"Narnaund",	"Narwana",	"Nilokheri",	"Nuh",	"Palwal",	"Panchkula",	"Panipat",	"Pataudi",	"Pehowa",	"Pinjaur",	"Punahana",	"Pundri",	"Radaur",	"Rania",	"Ratia",	"Rewari",	"Rewari District",	"Rohtak",	"Safidon",	"Samalkha",	"Shadipur Julana",	"Shahabad",	"Sirsa",	"Sohna",	"Sonipat",	"Taoru",	"Thanesar",	"Tohana",	"Tosham",	"Uklana",	"Yamunanagar",
     ],
     HimachalPradesh: [
      "Arki",	"Baddi",	"Banjar",	"Bilaspur",	"Chamba",	"Chaupal",	"Chowari",	"Chuari Khas",	"Dagshai",	"Dalhousie",	"Daulatpur",	"Dera Gopipur",	"Dharamsala",	"Gagret",	"Ghumarwin",	"Hamirpur",	"Jawala Mukhi",	"Jogindarnagar",	"Jubbal",	"Jutogh",	"Kalka",	"Kangar",	"Kangra",	"Kasauli",	"Kinnaur",	"Kotkhai",	"Kotla",	"Kulu",	"Kyelang",	"Lahul and Spiti",	"Manali",	"Mandi",	"Nadaun",	"Nagar",	"Nagrota",	"Nahan",	"Nalagarh",	"Palampur",	"Pandoh",	"Paonta Sahib",	"Parwanoo",	"Rajgarh",	"Rampur",	"Rohru",	"Sabathu",	"Santokhgarh",	"Sarahan",	"Sarka Ghat",	"Seoni",	"Shimla",	"Sirmaur",	"Solan",	"Sundarnagar",	"Theog",	"Tira Sujanpur",	"Una",	"Yol",
     ],
     JammuandKashmir:[
      "Akhnur",	"Anantnag",	"Awantipur",	"Badgam",	"Bandipore",	"Bandipura",	"Banihal",	"Baramula",	"Batoti",	"Bhadarwah",	"Bijbehara",	"Bishnah",	"Doda",	"Gandarbal",	"Ganderbal",	"Gho Brahmanan de",	"Hajan",	"Hiranagar",	"Jammu",	"Jaurian",	"Kathua",	"Katra",	"Khaur",	"Kishtwar",	"Kud",	"Kulgam",	"Kupwara",	"Ladakh",	"Magam",	"Nawanshahr",	"Noria",	"Padam",	"Pahlgam",	"Parol",	"Pattan",	"Pulwama",	"Punch",	"Qazigund",	"Rajaori",	"Rajauri",	"Ramban",	"Ramgarh",	"Ramnagar",	"Riasi",	"Samba",	"Shupiyan",	"Sopur",	"Soyibug",	"Srinagar",	"Sumbal",	"Thang",	"Thanna Mandi",	"Tral",	"Tsrar Sharif",	"Udhampur",	"Uri",
     ],
     Jharkhand:[
      "Bagra",	"Barka Kana",	"Barki Saria",	"Barwadih",	"Bhojudih",	"Bokaro",	"Bundu",	"Chaibasa",	"Chakradharpur",	"Chakulia",	"Chandil",	"Chas",	"Chatra",	"Chiria",	"Daltonganj",	"Deogarh",	"Dhanbad",	"Dhanwar",	"Dugda",	"Dumka",	"Garhwa",	"Ghatsila",	"Giridih",	"Gobindpur",	"Godda",	"Gomoh",	"Gopinathpur",	"Gua",	"Gumia",	"Gumla",	"Hazaribag",	"Hazaribagh",	"Hesla",	"Husainabad",	"Jagannathpur",	"Jamadoba",	"Jamshedpur",	"Jamtara",	"Jasidih",	"Jharia",	"Jugsalai",	"Jumri Tilaiya",	"Kalikapur",	"Kandra",	"Kanke",	"Katras",	"Kenduadih",	"Kharsawan",	"Khunti",	"Kodarma",	"Kuju",	"Latehar",	"Lohardaga",	"Madhupur",	"Malkera",	"Manoharpur",	"Mugma",	"Mushabani",	"Neturhat",	"Nirsa",	"Noamundi",	"Pakur",	"Palamu",	"Pashchim Singhbhum",	"patamda",	"Pathardih",	"Purba Singhbhum",	"Ramgarh",	"Ranchi",	"Ray",	"Sahibganj",	"Saraikela",	"Sarubera",	"Sijua",	"Simdega",	"Sini",	"Topchanchi",
     ],
     Karnataka: [
      "Afzalpur",	"Ajjampur",	"Aland",	"Alnavar",	"Alur",	"Anekal",	"Ankola",	"Annigeri",	"Arkalgud",	"Arsikere",	"Athni",	"Aurad",	"Badami",	"Bagalkot",	"Bagepalli",	"Bail-Hongal",	"Ballari",	"Banavar",	"Bangalore Rural",	"Bangalore Urban",	"Bangarapet",	"Bannur",	"Bantval",	"Basavakalyan",	"Basavana Bagevadi",	"Belgaum",	"Bellary",	"Belluru",	"Beltangadi",	"Belur",	"Bengaluru",	"Bhadravati",	"Bhalki",	"Bhatkal",	"Bidar",	"Bijapur",	"Bilgi",	"Birur",	"Byadgi",	"Byndoor",	"Canacona",	"Challakere",	"Chamrajnagar",	"Channagiri",	"Channapatna",	"Channarayapatna",	"Chik Ballapur",	"Chikkaballapur",	"Chikmagalur",	"Chiknayakanhalli",	"Chikodi",	"Chincholi",	"Chintamani",	"Chitapur",	"Chitradurga",	"Closepet",	"Coondapoor",	"Dakshina Kannada",	"Dandeli",	"Davanagere",	"Devanhalli",	"Dharwad",	"Dod Ballapur",	"French Rocks",	"Gadag",	"Gadag-Betageri",	"Gajendragarh",	"Gangawati",	"Gangolli",	"Gokak",	"Gokarna",	"Goribidnur",	"Gorur",	"Gubbi",	"Gudibanda",	"Gulbarga",	"Guledagudda",	"Gundlupēt",	"Gurmatkal",	"Hadagalli",	"Haliyal",	"Hampi",	"Hangal",	"Harihar",	"Harpanahalli",	"Hassan",	"Haveri",	"Heggadadevankote",	"Hirekerur",	"Hiriyur",	"Holalkere",	"Hole Narsipur",	"Homnabad",	"Honavar",	"Honnali",	"Hosanagara",	"Hosangadi",	"Hosdurga",	"Hoskote",	"Hospet",	"Hubli",	"Hukeri",	"Hungund",	"Hunsur",	"Ilkal",	"Indi",	"Jagalur",	"Jamkhandi",	"Jevargi",	"Kadur",	"Kalghatgi",	"Kampli",	"Kankanhalli",	"Karkala",	"Karwar",	"Kavalur",	"Kerur",	"Khanapur",	"Kodagu",	"Kodigenahalli",	"Kodlipet",	"Kolar",	"Kollegal",	"Konanur",	"Konnur",	"Koppa",	"Koppal",	"Koratagere",	"Kotturu",	"Krishnarajpet",	"Kudachi",	"Kudligi",	"Kumsi",	"Kumta",	"Kundgol",	"Kunigal",	"Kurgunta",	"Kushalnagar",	"Kushtagi",	"Lakshmeshwar",	"Lingsugur",	"Londa",	"Maddagiri",	"Maddur",	"Madikeri",	"Magadi",	"Mahalingpur",	"Malavalli",	"Malpe",	"Malur",	"Mandya",	"Mangalore",	"Manipal",	"Manvi",	"Mayakonda",	"Melukote",	"Mudbidri",	"Muddebihal",	"Mudgal",	"Mudgere",	"Mudhol",	"Mulbagal",	"Mulgund",	"Mulki",	"Mundargi",	"Mundgod",	"Munirabad",	"Murudeshwara",	"Mysore",	"Nagamangala",	"Nanjangud",	"Narasimharajapura",	"Naregal",	"Nargund",	"Navalgund",	"Nelamangala",	"Nyamti",	"Pangala",	"Pavugada",	"Piriyapatna",	"Ponnampet",	"Puttur",	"Rabkavi",	"Raichur",	"Ramanagara",	"Ranibennur",	"Raybag",	"Robertsonpet",	"Ron",	"Sadalgi",	"Sagar",	"Sakleshpur",	"Sandur",	"Sanivarsante",	"Sankeshwar",	"Sargur",	"Saundatti",	"Savanur",	"Seram",	"Shahabad",	"Shahpur",	"Shiggaon",	"Shikarpur",	"Shimoga",	"Shirhatti",	"Shorapur",	"Shrirangapattana",	"Siddapur",	"Sidlaghatta",	"Sindgi",	"Sindhnur",	"Sira",	"Sirsi",	"Siruguppa",	"Someshwar",	"Somvarpet",	"Sorab",	"Sravana Belgola",	"Sringeri",	"Srinivaspur",	"Sulya",	"Suntikoppa",	"Talikota",	"Tarikere",	"Tekkalakote",	"Terdal",	"Tiptur",	"Tirthahalli",	"Tirumakudal Narsipur",	"Tumkur",	"Turuvekere",	"Udupi",	"Ullal",	"Uttar Kannada",	"Vadigenhalli",	"Virarajendrapet",	"Wadi",	"Yadgir",	"Yelahanka",	"Yelandur",	"Yelbarga",	"Yellapur",
     ],
     Kerala: [
      "Adur",	"Alappuzha",	"Aluva",	"Alwaye",	"Angamali",	"Aroor",	"Arukutti",	"Attingal",	"Avanoor",	"Azhikkal",	"Badagara",	"Beypore",	"Changanacheri",	"Chēlakara",	"Chengannur",	"Cherpulassery",	"Cherthala",	"Chetwayi",	"Chittur",	"Cochin",	"Dharmadam",	"Edakkulam",	"Elur",	"Erattupetta",	"Ernakulam",	"Ferokh",	"Guruvayur",	"Idukki",	"Iringal",	"Irinjalakuda",	"Kadakkavoor",	"Kalamassery",	"Kalavoor",	"Kalpatta",	"Kannangad",	"Kannavam",	"Kannur",	"Kasaragod",	"Kasaragod District",	"Kattanam",	"Kayankulam",	"Kizhake Chalakudi",	"Kodungallur",	"Kollam",	"Kotamangalam",	"Kottayam",	"Kovalam",	"Kozhikode",	"Kumbalam",	"Kunnamangalam",	"Kunnamkulam",	"Kunnumma",	"Kutiatodu",	"Kuttampuzha",	"Lalam",	"Mahē",	"Malappuram",	"Manjeri",	"Manjēshvar",	"Mannarakkat",	"Marayur",	"Mattanur",	"Mavelikara",	"Mavoor",	"Muluppilagadu",	"Munnar",	"Muvattupula",	"Muvattupuzha",	"Nadapuram",	"Naduvannur",	"Nedumangad",	"Neyyattinkara",	"Nilēshwar",	"Ottappalam",	"Palackattumala",	"Palakkad district",	"Palghat",	"Panamaram",	"Pappinisshēri",	"Paravur Tekkumbhagam",	"Pariyapuram",	"Pathanamthitta",	"Pattanamtitta",	"Payyannur",	"Perumbavoor",	"Perumpavur",	"Perya",	"Piravam",	"Ponmana",	"Ponnani",	"Punalur",	"Ramamangalam",	"Shertallai",	"Shōranur",	"Talipparamba",	"Tellicherry",	"Thanniyam",	"Thiruvananthapuram",	"Thrissur",	"Thrissur District",	"Tirur",	"Tiruvalla",	"Vaikam",	"Varkala",	"Vayalar",	"Vettur",	"Wayanad",
     ], 
     MadyaPradesh:[
      "Agar",	"Ajaigarh",	"Akodia",	"Alampur",	"Alirajpur",	"Alot",	"Amanganj",	"Amarkantak",	"Amarpatan",	"Amarwara",	"Ambah",	"Amla",	"Anjad",	"Antri",	"Anuppur",	"Aron",	"Ashoknagar",	"Ashta",	"Babai",	"Badarwas",	"Badnawar",	"Bag",	"Bagli",	"Baihar",	"Baikunthpur",	"Bakshwaho",	"Balaghat",	"Baldeogarh",	"Bamna",	"Bamor Kalan",	"Bamora",	"Banda",	"Barela",	"Barghat",	"Bargi",	"Barhi",	"Barwani",	"Basoda",	"Begamganj",	"Beohari",	"Berasia",	"Betma",	"Betul",	"Betul Bazar",	"Bhabhra",	"Bhainsdehi",	"Bhander",	"Bhanpura",	"Bhawaniganj",	"Bhikangaon",	"Bhind",	"Bhitarwar",	"Bhopal",	"Biaora",	"Bijawar",	"Bijrauni",	"Bodri",	"Burhanpur",	"Burhar",	"Chanderi",	"Chandia",	"Chandla",	"Chhatarpur",	"Chhindwara",	"Chichli",	"Chorhat",	"Daboh",	"Dabra",	"Damoh",	"Datia",	"Deori Khas",	"Depalpur",	"Dewas",	"Dhamnod",	"Dhana",	"Dhar",	"Dharampuri",	"Dindori",	"Etawa",	"Gadarwara",	"Garha Brahman",	"Garhakota",	"Gautampura",	"Ghansor",	"Gogapur",	"Gohadi",	"Govindgarh",	"Guna",	"Gurh",	"Gwalior",	"Harda",	"Harda Khas",	"Harpalpur",	"Harrai",	"Harsud",	"Hatod",	"Hatta",	"Hindoria",	"Hoshangabad",	"Iawar",	"Ichhawar",	"Iklehra",	"Indore",	"Isagarh",	"Itarsi",	"Jabalpur",	"Jaisinghnagar",	"Jaithari",	"Jamai",	"Jaora",	"Jatara",	"Jawad",	"Jhabua",	"Jiran",	"Jobat",	"Kailaras",	"Kaimori",	"Kannod",	"Kareli",	"Karera",	"Karrapur",	"Kasrawad",	"Katangi",	"Katni",	"Khachrod",	"Khailar",	"Khajuraho Group of Monuments",	"Khamaria",	"Khandwa",	"Khandwa district",	"Khargapur",	"Khargone",	"Khategaon",	"Khilchipur",	"Khirkiyan",	"Khujner",	"Khurai",	"Kolaras",	"Korwai",	"Kotar",	"Kothi",	"Kotma",	"Kotwa",	"Kukshi",	"Kumbhraj",	"Lahar",	"Lakhnadon",	"Leteri",	"Lodhikheda",	"Machalpur",	"Madhogarh",	"Maheshwar",	"Mahgawan",	"Maihar",	"Majholi",	"Maksi",	"Malhargarh",	"Manasa",	"Manawar",	"Mandideep",	"Mandla",	"Mandleshwar",	"Mandsaur",	"Mangawan",	"Manpur",	"Mau",	"Mauganj",	"Mihona",	"Mohgaon",	"Morar",	"Morena",	"Multai",	"Mundi",	"Mungaoli",	"Murwara",	"Nagda",	"Nagod",	"Naigarhi",	"Nainpur",	"Namli",	"Naraini",	"Narayangarh",	"Narsimhapur",	"Narsinghgarh",	"Narwar",	"Nasrullahganj",	"Neemuch",	"Nepanagar",	"Orchha",	"Pachmarhi",	"Palera",	"Pali",	"Panagar",	"Panara",	"Pandhana",	"Pandhurna",	"Panna",	"Pansemal",	"Parasia",	"Patan",	"Patharia",	"Pawai",	"Petlawad",	"Piploda",	"Pithampur",	"Porsa",	"Punasa",	"Raghogarh",	"Rahatgarh",	"Raisen",	"Rajgarh",	"Rajnagar",	"Rajpur",	"Rampura",	"Ranapur",	"Ratangarh",	"Ratlam",	"Rehli",	"Rehti",	"Rewa",	"Sabalgarh",	"Sagar",	"Sailana",	"Sanawad",	"Sanchi",	"Sanwer",	"Sarangpur",	"Satna",	"Satwas",	"Saugor",	"Sausar",	"Sehore",	"Sendhwa",	"Seondha",	"Seoni",	"Seoni Malwa",	"Shahdol",	"Shahgarh",	"Shahpur",	"Shahpura",	"Shajapur",	"Shamgarh",	"Sheopur",	"Shivpuri",	"Shujalpur",	"Sidhi",	"Sihora",	"Simaria",	"Singoli",	"Singrauli",	"Sirmaur",	"Sironj",	"Sitamau",	"Sohagi",	"Sohagpur",	"Sultanpur",	"Susner",	"Tal",	"Talen",	"Tarana",	"Tekanpur",	"Tendukheda",	"Teonthar",	"Thandla",	"Tikamgarh",	"Tirodi",	"Udaipura",	"Ujjain",	"Ukwa",	"Umaria",	"Umaria District",	"Umri",	"Unhel",	"Vidisha",	"Waraseoni",
     ],
     Manipur:[
      "Bishnupur",	"Churachandpur",	"Imphal",	"Kakching",	"Mayang Imphal",	"Moirang",	"Phek",	"Senapati",	"Tamenglong",	"Thoubal",	"Ukhrul",	"Wangjing",	"Yairipok",
     ],
     Meghalaya:[
      "Cherrapunji",	"East Garo Hills",	"East Jaintia Hills",	"East Khasi Hills",	"Mairang",	"Mankachar",	"Nongpoh",	"Nongstoin",	"North Garo Hills",	"Ri-Bhoi",	"Shillong",	"South Garo Hills",	"South West Garo Hills",	"South West Khasi Hills",	"Tura",	"West Garo Hills",	"West Jaintia Hills",	"West Khasi Hills",
     ],
     Mizoram:[
      "Aizawl",	"Champhai",	"Darlawn",	"Khawhai",	"Kolasib",	"Kolasib district",	"Lawngtlai",	"Lunglei",	"Mamit",	"North Vanlaiphai",	"Saiha",	"Sairang",	"Saitlaw",	"Serchhip",	"Thenzawl",
     ],
     Nagaland: [
      "Dimapur",	"Kohima",	"Mokokchung",	"Mon",	"Peren",	"Phek",	"Tuensang",	"Tuensang District",	"Wokha",	"Zunheboto",
     ],
     Puducherry:[
      "Karaikal",	"Mahe",	"Puducherry",	"Yanam",
     ],
     Punjab: [
      "Abohar",	"Adampur",	"Ajitgarh",	"Ajnala",	"Akalgarh",	"Alawalpur",	"Amloh",	"Amritsar",	"Anandpur Sahib",	"Badhni Kalan",	"Bagha Purana",	"Bakloh",	"Balachor",	"Banga",	"Banur",	"Barnala",	"Batala",	"Begowal",	"Bhadaur",	"Bhatinda",	"Bhawanigarh",	"Bhikhi",	"Bhogpur",	"Bholath",	"Budhlada",	"Chima",	"Dasuya",	"Dera Baba Nanak",	"Dera Bassi",	"Dhanaula",	"Dhariwal",	"Dhilwan",	"Dhudi",	"Dhuri",	"Dina Nagar",	"Dirba",	"Doraha",	"Faridkot",	"Fatehgarh Churian",	"Fatehgarh Sahib",	"Fazilka",	"Firozpur",	"Firozpur District",	"Gardhiwala",	"Garhshankar",	"Ghanaur",	"Giddarbaha",	"Gurdaspur",	"Guru Har Sahai",	"Hajipur",	"Hariana",	"Hoshiarpur",	"Ishanpur",	"Jagraon",	"Jaito",	"Jalalabad",	"Jalandhar",	"Jandiala",	"Jandiala Guru",	"Kalanaur",	"Kapurthala",	"Kartarpur",	"Khamanon",	"Khanna",	"Kharar",	"Khemkaran",	"Kot Isa Khan",	"Kotkapura",	"Laungowal",	"Ludhiana",	"Machhiwara",	"Majitha",	"Makhu",	"Malaut",	"Malerkotla",	"Mansa",	"Maur Mandi",	"Moga",	"Mohali",	"Morinda",	"Mukerian",	"Nabha",	"Nakodar",	"Nangal",	"Nawanshahr",	"Nurmahal",	"Nurpur Kalan",	"Pathankot",	"Patiala",	"Patti",	"Phagwara",	"Phillaur",	"Qadian",	"Rahon",	"Raikot",	"Rajasansi",	"Rajpura",	"Ram Das",	"Rampura",	"Rupnagar",	"Samrala",	"Sanaur",	"Sangrur",	"Sardulgarh",	"Shahid Bhagat Singh Nagar",	"Shahkot",	"Sham Churasi",	"Sirhind-Fategarh",	"Sri Muktsar Sahib",	"Sultanpur Lodhi",	"Sunam",	"Talwandi Bhai",	"Talwara",	"Tarn Taran Sahib",
     ],
     Rajasthan: [
      "Abhaneri",	"Abu",	"Abu Road",	"Ajmer",	"Aklera",	"Alwar",	"Amet",	"Anta",	"Anupgarh",	"Asind",	"Bagar",	"Bakani",	"Bali",	"Balotra",	"Bandikui",	"Banswara",	"Baran",	"Bari",	"Bari Sadri",	"Barmer",	"Basi",	"Basni",	"Baswa",	"Bayana",	"Beawar",	"Begun",	"Behror",	"Bhadasar",	"Bhadra",	"Bharatpur",	"Bhasawar",	"Bhilwara",	"Bhindar",	"Bhinmal",	"Bhiwadi",	"Bhuma",	"Bikaner",	"Bilara",	"Bissau",	"Borkhera",	"Bundi",	"Chaksu",	"Chechat",	"Chhabra",	"Chhapar",	"Chhoti Sadri",	"Chidawa",	"Chittaurgarh",	"Churu",	"Dariba",	"Dausa",	"Deoli",	"Deshnoke",	"Devgarh",	"Dhaulpur",	"Didwana",	"Dig",	"Dungarpur",	"Fatehpur",	"Galiakot",	"Ganganagar",	"Gangapur",	"Govindgarh",	"Gulabpura",	"Hanumangarh",	"Hindaun",	"Jahazpur",	"Jaipur",	"Jaisalmer",	"Jaitaran",	"Jalor",	"Jalore",	"Jhalawar",	"Jhalrapatan",	"Jhunjhunun",	"Jobner",	"Jodhpur",	"Kaman",	"Kanor",	"Kapren",	"Karanpur",	"Karauli",	"Kekri",	"Keshorai Patan",	"Khandela",	"Khanpur",	"Khetri",	"Kishangarh",	"Kota",	"Kotputli",	"Kuchaman",	"Kuchera",	"Kumher",	"Kushalgarh",	"Lachhmangarh Sikar",	"Ladnun",	"Lakheri",	"Lalsot",	"Losal",	"Mahwah",	"Makrana",	"Malpura",	"Mandal",	"Mandalgarh",	"Mandawar",	"Mangrol",	"Manohar Thana",	"Manoharpur",	"Meethari Marwar",	"Merta",	"Mundwa",	"Nadbai",	"Nagar",	"Nagaur",	"Nainwa",	"Napasar",	"Naraina",	"Nasirabad",	"Nathdwara",	"Nawa",	"Nawalgarh",	"Neem ka Thana",	"Nimaj",	"Nimbahera",	"Niwai",	"Nohar",	"Nokha",	"Padampur",	"Pali",	"Partapur",	"Parvatsar",	"Phalodi",	"Phulera",	"Pilani",	"Pilibangan",	"Pindwara",	"Pipar",	"Pirawa",	"Pokaran",	"Pratapgarh",	"Pushkar",	"Raipur",	"Raisinghnagar",	"Rajakhera",	"Rajaldesar",	"Rajgarh",	"Rajsamand",	"Ramganj Mandi",	"Ramgarh",	"Rani",	"Ratangarh",	"Rawatbhata",	"Rawatsar",	"Ringas",	"Sadri",	"Salumbar",	"Sambhar",	"Samdari",	"Sanchor",	"Sangaria",	"Sangod",	"Sardarshahr",	"Sarwar",	"Sawai Madhopur",	"Shahpura",	"Sheoganj",	"Sikar",	"Sirohi",	"Siwana",	"Sojat",	"Sri Dungargarh",	"Sri Madhopur",	"Sujangarh",	"Suket",	"Sunel",	"Surajgarh",	"Suratgarh",	"Takhatgarh",	"Taranagar",	"Tijara",	"Todabhim",	"Todaraisingh",	"Tonk",	"Udaipur",	"Udpura",	"Uniara",	"Wer",
     ],
     Sikkim: [
      "East District",	"Gangtok",	"Gyalshing",	"Jorethang",	"Mangan",	"Namchi",	"Naya Bazar",	"North District",	"Rangpo",	"Singtam",	"South District",	"West District",
     ],
     TamilNadu: [
      "Abiramam",	"Adirampattinam",	"Aduthurai",	"Alagapuram",	"Alandur",	"Alanganallur",	"Alangayam",	"Alangudi",	"Alangulam",	"Alappakkam",	"Alwa Tirunagari",	"Ambasamudram",	"Ambattur",	"Ambur",	"Ammapettai",	"Anamalais",	"Andippatti",	"Annamalainagar",	"Annavasal",	"Annur",	"Anthiyur",	"Arakkonam",	"Arantangi",	"Arcot",	"Arimalam",	"Ariyalur",	"Arni",	"Arumbavur",	"Arumuganeri",	"Aruppukkottai",	"Aruvankad",	"Attayyampatti",	"Attur",	"Auroville",	"Avadi",	"Avinashi",	"Ayakudi",	"Ayyampettai",	"Belur",	"Bhavani",	"Bodinayakkanur",	"Chengam",	"Chennai",	"Chennimalai",	"Chetput",	"Chettipalaiyam",	"Cheyyar",	"Cheyyur",	"Chidambaram",	"Chingleput",	"Chinna Salem",	"Chinnamanur",	"Chinnasekkadu",	"Cholapuram",	"Coimbatore",	"Colachel",	"Cuddalore",	"Cumbum",	"Denkanikota",	"Desur",	"Devadanappatti",	"Devakottai",	"Dhali",	"Dharapuram",	"Dharmapuri",	"Dindigul",	"Dusi",	"Elayirampannai",	"Elumalai",	"Eral",	"Eraniel",	"Erode",	"Erumaippatti",	"Ettaiyapuram",	"Gandhi Nagar",	"Gangaikondan",	"Gangavalli",	"Gingee",	"Gobichettipalayam",	"Gudalur",	"Gudiyatham",	"Guduvancheri",	"Gummidipundi",	"Harur",	"Hosur",	"Idappadi",	"Ilampillai",	"Iluppur",	"Injambakkam",	"Irugur",	"Jalakandapuram",	"Jalarpet",	"Jayamkondacholapuram",	"Kadambur",	"Kadayanallur",	"Kalakkadu",	"Kalavai",	"Kallakkurichchi",	"Kallidaikurichi",	"Kallupatti",	"Kalugumalai",	"Kamuthi",	"Kanadukattan",	"Kancheepuram",	"Kanchipuram",	"Kangayam",	"Kanniyakumari",	"Karaikkudi",	"Karamadai",	"Karambakkudi",	"Kariapatti",	"Karumbakkam",	"Karur",	"Katpadi",	"Kattivakkam",	"Kattupputtur",	"Kaveripatnam",	"Kayalpattinam",	"Kayattar",	"Keelakarai",	"Kelamangalam",	"Kil Bhuvanagiri",	"Kilvelur",	"Kiranur",	"Kodaikanal",	"Kodumudi",	"Kombai",	"Konganapuram",	"Koothanallur",	"Koradachcheri",	"Korampallam",	"Kotagiri",	"Kottaiyur",	"Kovilpatti",	"Krishnagiri",	"Kulattur",	"Kulittalai",	"Kumaralingam",	"Kumbakonam",	"Kunnattur",	"Kurinjippadi",	"Kuttalam",	"Kuzhithurai",	"Lalgudi",	"Madambakkam",	"Madipakkam",	"Madukkarai",	"Madukkur",	"Madurai",	"Madurantakam",	"Mallapuram",	"Mallasamudram",	"Mallur",	"Manali",	"Manalurpettai",	"Manamadurai",	"Manappakkam",	"Manapparai",	"Manavalakurichi",	"Mandapam",	"Mangalam",	"Mannargudi",	"Marakkanam",	"Marandahalli",	"Masinigudi",	"Mattur",	"Mayiladuthurai",	"Melur",	"Mettuppalaiyam",	"Mettur",	"Minjur",	"Mohanur",	"Mudukulattur",	"Mulanur",	"Musiri",	"Muttupet",	"Naduvattam",	"Nagapattinam",	"Nagercoil",	"Namagiripettai",	"Namakkal",	"Nambiyur",	"Nambutalai",	"Nandambakkam",	"Nangavalli",	"Nangilickondan",	"Nanguneri",	"Nannilam",	"Naravarikuppam",	"Nattam",	"Nattarasankottai",	"Needamangalam",	"Neelankarai",	"Negapatam",	"Nellikkuppam",	"Nilakottai",	"Nilgiris",	"Odugattur",	"Omalur",	"Ooty",	"Padmanabhapuram",	"Palakkodu",	"Palamedu",	"Palani",	"Palavakkam",	"Palladam",	"Pallappatti",	"Pallattur",	"Pallavaram",	"Pallikondai",	"Pallipattu",	"Pallippatti",	"Panruti",	"Papanasam",	"Papireddippatti",	"Papparappatti",	"Paramagudi",	"Pattukkottai",	"Pennadam",	"Pennagaram",	"Pennathur",	"Peraiyur",	"Perambalur",	"Peranamallur",	"Peranampattu",	"Peravurani",	"Periyakulam",	"Periyanayakkanpalaiyam",	"Periyanegamam",	"Periyapatti",	"Periyapattinam",	"Perundurai",	"Perungudi",	"Perur",	"Pollachi",	"Polur",	"Ponnamaravati",	"Ponneri",	"Poonamalle",	"Porur",	"Pudukkottai",	"Puduppatti",	"Pudur",	"Puduvayal",	"Puliyangudi",	"Puliyur",	"Pullambadi",	"Punjai Puliyampatti",	"Rajapalaiyam",	"Ramanathapuram",	"Rameswaram",	"Rasipuram",	"Saint Thomas Mount",	"Salem",	"Sathankulam",	"Sathyamangalam",	"Sattur",	"Sayalkudi",	"Seven Pagodas",	"Sholinghur",	"Singanallur",	"Singapperumalkovil",	"Sirkazhi",	"Sirumugai",	"Sivaganga",	"Sivagiri",	"Sivakasi",	"Srimushnam",	"Sriperumbudur",	"Srivaikuntam",	"Srivilliputhur",	"Suchindram",	"Sulur",	"Surandai",	"Swamimalai",	"Tambaram",	"Tanjore",	"Taramangalam",	"Tattayyangarpettai",	"Thanjavur",	"Tharangambadi",	"Theni",	"Thenkasi",	"Thirukattupalli",	"Thiruthani",	"Thiruvaiyaru",	"Thiruvallur",	"Thiruvarur",	"Thiruvidaimaruthur",	"Thoothukudi",	"Tindivanam",	"Tinnanur",	"Tiruchchendur",	"Tiruchengode",	"Tiruchirappalli",	"Tirukkoyilur",	"Tirumullaivasal",	"Tirunelveli",	"Tirunelveli Kattabo",	"Tiruppalaikudi",	"Tirupparangunram",	"Tiruppur",	"Tiruppuvanam",	"Tiruttangal",	"Tiruvannamalai",	"Tiruvottiyur",	"Tisaiyanvilai",	"Tondi",	"Turaiyur",	"Udangudi",	"Udumalaippettai",	"Uppiliyapuram",	"Usilampatti",	"Uttamapalaiyam",	"Uttiramerur",	"Ūttukkuli",	"V.S.K.Valasai (Dindigul-Dist.)",	"Vadakku Valliyur",	"Vadakku Viravanallur",	"Vadamadurai",	"Vadippatti",	"Valangaiman",	"Valavanur",	"Vallam",	"Valparai",	"Vandalur",	"Vandavasi",	"Vaniyambadi",	"Vasudevanallur",	"Vattalkundu",	"Vedaraniyam",	"Vedasandur",	"Velankanni",	"Vellanur",	"Vellore",	"Velur",	"Vengavasal",	"Vettaikkaranpudur",	"Vettavalam",	"Vijayapuri",	"Vikravandi",	"Vilattikulam",	"Villupuram",	"Viraganur",	"Virudhunagar",	"Vriddhachalam",	"Walajapet",	"Wallajahbad",	"Wellington",
     ],
     Telangana: [
      "Adilabad",	"Alampur",	"Andol",	"Asifabad",	"Balapur",	"Banswada",	"Bellampalli",	"Bhadrachalam",	"Bhadradri Kothagudem",	"Bhaisa",	"Bhongir",	"Bodhan",	"Chandur",	"Chatakonda",	"Dasnapur",	"Devarkonda",	"Dornakal",	"Farrukhnagar",	"Gaddi Annaram",	"Gadwal",	"Ghatkesar",	"Gopalur",	"Gudur",	"Hyderabad",	"Jagtial",	"Jangaon",	"Jangoan",	"Jayashankar Bhupalapally",	"Jogulamba Gadwal",	"Kagaznagar",	"Kamareddi",	"Kamareddy",	"Karimnagar",	"Khammam",	"Kodar",	"Koratla",	"Kothapet",	"Kottagudem",	"Kottapalli",	"Kukatpalli",	"Kyathampalle",	"Lakshettipet",	"Lal Bahadur Nagar",	"Mahabubabad",	"Mahbubnagar",	"Malkajgiri",	"Mancheral",	"Mandamarri",	"Manthani",	"Manuguru",	"Medak",	"Medchal",	"Medchal Malkajgiri",	"Mirialguda",	"Nagar Karnul",	"Nalgonda",	"Narayanpet",	"Narsingi",	"Naspur",	"Nirmal",	"Nizamabad",	"Paloncha",	"Palwancha",	"Patancheru",	"Peddapalli",	"Quthbullapur",	"Rajanna Sircilla",	"Ramagundam",	"Ramgundam",	"Rangareddi",	"Sadaseopet",	"Sangareddi",	"Sathupalli",	"Secunderabad",	"Serilingampalle",	"Siddipet",	"Singapur",	"Sirpur",	"Sirsilla",	"Sriramnagar",	"Suriapet",	"Tandur",	"Uppal Kalan",	"Vemalwada",	"Vikarabad",	"Wanparti",	"Warangal",	"Yellandu",	"Zahirabad",
     ],
     Tripura: [
      "Agartala",	"Amarpur",	"Ambasa",	"Barjala",	"Belonia",	"Dhalai",	"Dharmanagar",	"Gomati",	"Kailashahar",	"Kamalpur",	"Khowai",	"North Tripura",	"Ranir Bazar",	"Sabrum",	"Sonamura",	"South Tripura",	"Udaipur",	"Unakoti",	"West Tripura",
     ],
     UttarPradesh: [
      "Achhnera",	"Afzalgarh",	"Agra",	"Ahraura",	"Ajodhya",	"Akbarpur",	"Aliganj",	"Aligarh",	"Allahabad",	"Allahganj",	"Amanpur",	"Ambahta",	"Ambedkar Nagar",	"Amethi",	"Amroha",	"Anandnagar",	"Antu",	"Anupshahr",	"Aonla",	"Atarra",	"Atrauli",	"Atraulia",	"Auraiya",	"Auras",	"Azamgarh",	"Baberu",	"Babina",	"Babrala",	"Babugarh",	"Bachhraon",	"Bachhrawan",	"Baghpat",	"Bah",	"Baheri",	"Bahjoi",	"Bahraich",	"Bahraigh",	"Bahsuma",	"Bahua",	"Bajna",	"Bakewar",	"Baldev",	"Ballia",	"Balrampur",	"Banat",	"Banbasa",	"Banda",	"Bangarmau",	"Bansdih",	"Bansgaon",	"Bansi",	"Bara Banki",	"Baragaon",	"Baraut",	"Bareilly",	"Barkhera Kalan",	"Barsana",	"Basti",	"Behat",	"Bela",	"Beniganj",	"Beswan",	"Bewar",	"Bhadohi",	"Bhagwantnagar",	"Bharthana",	"Bharwari",	"Bhinga",	"Bhongaon",	"Bidhuna",	"Bighapur Khurd",	"Bijnor",	"Bikapur",	"Bilari",	"Bilariaganj",	"Bilaspur",	"Bilgram",	"Bilhaur",	"Bilsanda",	"Bilsi",	"Bilthra",	"Bindki",	"Bisalpur",	"Bisauli",	"Bisenda Buzurg",	"Bishunpur Urf Maharajganj",	"Biswan",	"Bithur",	"Budaun",	"Budhana",	"Bulandshahr",	"Captainganj",	"Chail",	"Chakia",	"Chandauli",	"Chandauli District",	"Chandpur",	"Chanduasi",	"Charkhari",	"Charthawal",	"Chhaprauli",	"Chharra",	"Chhata",	"Chhibramau",	"Chhutmalpur",	"Chillupar",	"Chirgaon",	"Chitrakoot",	"Chopan",	"Chunar",	"Colonelganj",	"Dadri",	"Dalmau",	"Dankaur",	"Dasna",	"Dataganj",	"Daurala",	"Dayal Bagh",	"Deoband",	"Deoranian",	"Deoria",	"Dewa",	"Dhampur",	"Dhanaura",	"Dhaurahra",	"Dibai",	"Dohrighat",	"Dostpur",	"Dudhi",	"Etah",	"Etawah",	"Faizabad",	"Farah",	"Faridnagar",	"Faridpur",	"Farrukhabad",	"Fatehabad",	"Fatehganj West",	"Fatehgarh",	"Fatehpur",	"Fatehpur Chaurasi",	"Fatehpur Sikri",	"Firozabad",	"Fyzabad",	"Gajraula",	"Gangoh",	"Ganj Dundwara",	"Ganj Muradabad",	"Garautha",	"Garhi Pukhta",	"Garhmuktesar",	"Gautam Buddha Nagar",	"Gawan",	"Ghatampur",	"Ghaziabad",	"Ghazipur",	"Ghiror",	"Ghorawal",	"Ghosi",	"Gohand",	"Gokul",	"Gola Bazar",	"Gola Gokarannath",	"Gonda",	"Gonda City",	"Gopamau",	"Gorakhpur",	"Goshainganj",	"Govardhan",	"Greater Noida",	"Gulaothi",	"Gunnaur",	"Gursahaiganj",	"Gursarai",	"Gyanpur",	"Haldaur",	"Hamirpur",	"Handia",	"Hapur",	"Haraiya",	"Hardoi",	"Harduaganj",	"Hasanpur",	"Hastinapur",	"Hata",	"Hathras",	"Iglas",	"Ikauna",	"Indergarh",	"Islamnagar",	"Itaunja",	"Itimadpur",	"Jagdishpur",	"Jagnair",	"Jahanabad",	"Jahangirabad",	"Jahangirpur",	"Jainpur",	"Jais",	"Jalalabad",	"Jalali",	"Jalalpur",	"Jalaun",	"Jalesar",	"Jansath",	"Jarwal",	"Jasrana",	"Jaswantnagar",	"Jaunpur",	"Jewar",	"Jhalu",	"Jhansi",	"Jhinjhak",	"Jhinjhana",	"Jhusi",	"Jyotiba Phule Nagar",	"Kabrai",	"Kachhwa",	"Kadaura",	"Kadipur",	"Kaimganj",	"Kairana",	"Kakori",	"Kakrala",	"Kalinagar",	"Kalpi",	"Kamalganj",	"Kampil",	"Kandhla",	"Kannauj",	"Kanpur",	"Kanpur Dehat",	"Kant",	"Kanth",	"Karari",	"Karhal",	"Kasganj",	"Katra",	"Kaushambi District",	"Kemri",	"Khada",	"Khaga",	"Khair",	"Khairabad",	"Khalilabad",	"Khanpur",	"Kharela",	"Khargupur",	"Kharkhauda",	"Khatauli",	"Khekra",	"Kheri",	"Khudaganj",	"Khurja",	"Khutar",	"Kirakat",	"Kiraoli",	"Kiratpur",	"Kishanpur",	"Kishni",	"Kithor",	"Konch",	"Kopaganj",	"Kosi",	"Kota",	"Kotra",	"Kulpahar",	"Kunda",	"Kundarkhi",	"Kurara",	"Kushinagar",	"Laharpur",	"Lakhimpur",	"Lakhna",	"Lalganj",	"Lalitpur",	"Lar",	"Lawar Khas",	"Loni",	"Lucknow",	"Lucknow District",	"Machhlishahr",	"Madhoganj",	"Madhogarh",	"Maghar",	"Mahaban",	"Maharajganj",	"Mahmudabad",	"Mahoba",	"Maholi",	"Mahroni",	"Mailani",	"Mainpuri",	"Malihabad",	"Mandawar",	"Maniar",	"Manikpur",	"Manjhanpur",	"Mankapur",	"Marahra",	"Mariahu",	"Mataundh",	"Mathura",	"Mau",	"Mau Aimma",	"Maudaha",	"Mauranwan",	"Mawana",	"Meerut",	"Mehnagar",	"Mehndawal",	"Milak",	"Miranpur",	"Miranpur Katra",	"Mirganj",	"Mirzapur",	"Misrikh",	"Mohan",	"Mohanpur",	"Moradabad",	"Moth",	"Mubarakpur",	"Mughal Sarai",	"Muhammadabad",	"Muradnagar",	"Mursan",	"Musafir-Khana",	"Muzaffarnagar",	"Nadigaon",	"Nagina",	"Nagram",	"Najibabad",	"Nakur",	"Nanauta",	"Nandgaon",	"Nanpara",	"Narauli",	"Naraura",	"Nautanwa",	"Nawabganj",	"Nichlaul",	"Nihtaur",	"Niwari",	"Nizamabad",	"Noida",	"Nurpur",	"Obra",	"Orai",	"Oran",	"Pachperwa",	"Padrauna",	"Pahasu",	"Pali",	"Palia Kalan",	"Parichha",	"Parichhatgarh",	"Parshadepur",	"Patiali",	"Patti",	"Pawayan",	"Phalauda",	"Phaphund",	"Phariha",	"Phulpur",	"Pihani",	"Pilibhit",	"Pilkhua",	"Pinahat",	"Pipraich",	"Pratapgarh",	"Pukhrayan",	"Puranpur",	"Purwa",	"Rabupura",	"Radhakund",	"Raebareli",	"Rajapur",	"Ramkola",	"Ramnagar",	"Rampur",	"Rampura",	"Ranipur",	"Rasra",	"Rasulabad",	"Rath",	"Raya",	"Renukut",	"Reoti",	"Richha",	"Robertsganj",	"Rudarpur",	"Rura",	"Sadabad",	"Sadat",	"Safipur",	"Saharanpur",	"Sahaspur",	"Sahaswan",	"Sahawar",	"Saidpur",	"Sakit",	"Salon",	"Sambhal",	"Samthar",	"Sandi",	"Sandila",	"Sant Kabir Nagar",	"Sant Ravi Das Nagar",	"Sarai Akil",	"Sarai Ekdil",	"Sarai Mir",	"Sarauli",	"Sardhana",	"Sarila",	"Sasni",	"Satrikh",	"Saurikh",	"Sector",	"Seohara",	"Shahabad",	"Shahganj",	"Shahi",	"Shahjahanpur",	"Shahpur",	"Shamli",	"Shamsabad",	"Shankargarh",	"Shergarh",	"Sherkot",	"Shikarpur",	"Shikohabad",	"Shishgarh",	"Shrawasti",	"Siddharthnagar",	"Sidhauli",	"Sidhpura",	"Sikandarabad",	"Sikandarpur",	"Sikandra",	"Sikandra Rao",	"Sirathu",	"Sirsa",	"Sirsaganj",	"Sirsi",	"Sisauli",	"Siswa Bazar",	"Sitapur",	"Sonbhadra",	"Soron",	"Suar",	"Sultanpur",	"Surianwan",	"Tajpur",	"Talbahat",	"Talgram",	"Tanda",	"Thakurdwara",	"Thana Bhawan",	"Tikaitnagar",	"Tikri",	"Tilhar",	"Tindwari",	"Titron",	"Tori-Fatehpur",	"Tulsipur",	"Tundla",	"Ugu",	"Ujhani",	"Ūn",	"Unnao",	"Usehat",	"Utraula",	"Varanasi",	"Vrindavan",	"Wazirganj",	"Zafarabad",	"Zaidpur",	"Zamania",
     ],
     Uttarakhand: [
      "Almora",	"Bageshwar",	"Barkot",	"Bazpur",	"Bhim Tal",	"Bhowali",	"Birbhaddar",	"Chakrata",	"Chamoli",	"Champawat",	"Clement Town",	"Dehradun",	"Devaprayag",	"Dharchula",	"Doiwala",	"Dugadda",	"Dwarahat",	"Garhwal",	"Haldwani",	"Harbatpur",	"Haridwar",	"Jaspur",	"Joshimath",	"Kaladhungi",	"Kalagarh Project Colony",	"Kashipur",	"Khatima",	"Kichha",	"Kotdwara",	"Laksar",	"Lansdowne",	"Lohaghat",	"Manglaur",	"Mussoorie",	"Naini Tal",	"Narendranagar",	"Pauri",	"Pipalkoti",	"Pithoragarh",	"Raipur",	"Raiwala Bara",	"Ramnagar",	"Ranikhet",	"Rishikesh",	"Roorkee",	"Rudraprayag",	"Sitarganj",	"Srinagar",	"Sultanpur",	"Tanakpur",	"Tehri",	"Tehri-Garhwal",	"Udham Singh Nagar",	"Uttarkashi",	"Vikasnagar",
     ],
     WestBengal: [
      "Ahmedpur",	"Aistala",	"Aknapur",	"Alipurduar",	"Amlagora",	"Amta",	"Amtala",	"Andal",	"Arambagh community development block",	"Asansol",	"Ashoknagar Kalyangarh",	"Badkulla",	"Baduria",	"Bagdogra",	"Bagnan",	"Bagula",	"Bahula",	"Baidyabati",	"Bakreswar",	"Balarampur",	"Bali Chak",	"Bally",	"Balurghat",	"Bamangola community development block",	"Baneswar",	"Bangaon",	"Bankra",	"Bankura",	"Bansberia",	"Bansihari community development block",	"Barabazar",	"Baranagar",	"Barasat",	"Bardhaman",	"Barjora",	"Barrackpore",	"Baruipur",	"Basanti",	"Basirhat",	"Bawali",	"Begampur",	"Belda",	"Beldanga",	"Beliatore",	"Berhampore",	"Bhadreswar",	"Bhandardaha",	"Bhatpara",	"Birbhum district",	"Birpara",	"Bishnupur",	"Bolpur",	"Budge Budge",	"Canning",	"Chakapara",	"Chakdaha",	"Champadanga",	"Champahati",	"Champdani",	"Chandannagar",	"Chandrakona",	"Chittaranjan",	"Churulia",	"Contai",	"Cooch Behar",	"Cossimbazar",	"Dakshin Dinajpur district",	"Dalkola",	"Dam Dam",	"Darjeeling",	"Daulatpur",	"Debagram",	"Debipur",	"Dhaniakhali community development block",	"Dhulagari",	"Dhulian",	"Dhupguri",	"Diamond Harbour",	"Digha",	"Dinhata",	"Domjur",	"Dubrajpur",	"Durgapur",	"Egra",	"Falakata",	"Farakka",	"Fort Gloster",	"Gaighata community development block",	"Gairkata",	"Gangadharpur",	"Gangarampur",	"Garui",	"Garulia",	"Ghatal",	"Giria",	"Gobardanga",	"Gobindapur",	"Gopalpur",	"Gopinathpur",	"Gorubathan",	"Gosaba",	"Gosanimari",	"Gurdaha",	"Guskhara",	"Habra",	"Haldia",	"Haldibari",	"Halisahar",	"Harindanga",	"Haringhata",	"Haripur",	"Hasimara",	"Hindusthan Cables Town",	"Hooghly district",	"Howrah",	"Ichapur",	"Indpur community development block",	"Ingraj Bazar",	"Islampur",	"Jafarpur",	"Jaigaon",	"Jalpaiguri",	"Jamuria",	"Jangipur",	"Jaynagar Majilpur",	"Jejur",	"Jhalida",	"Jhargram",	"Jhilimili",	"Kakdwip",	"Kalaikunda",	"Kaliaganj",	"Kalimpong",	"Kalna",	"Kalyani",	"Kamarhati",	"Kamarpukur",	"Kanchrapara",	"Kandi",	"Karimpur",	"Katwa",	"Kenda",	"Keshabpur",	"Kharagpur",	"Kharar",	"Kharba",	"Khardaha",	"Khatra",	"Kirnahar",	"Kolkata",	"Konnagar",	"Krishnanagar",	"Krishnapur",	"Kshirpai",	"Kulpi",	"Kultali",	"Kulti",	"Kurseong",	"Lalgarh",	"Lalgola",	"Loyabad",	"Madanpur",	"Madhyamgram",	"Mahiari",	"Mahishadal community development block",	"Mainaguri",	"Manikpara",	"Masila",	"Mathabhanga",	"Matiali community development block",	"Matigara community development block",	"Medinipur",	"Mejia community development block",	"Memari",	"Mirik",	"Mohanpur community development block",	"Monoharpur",	"Muragacha",	"Muri",	"Murshidabad",	"Nabadwip",	"Nabagram",	"Nadia district",	"Nagarukhra",	"Nagrakata",	"Naihati",	"Naksalbari",	"Nalhati",	"Nalpur",	"Namkhana community development block",	"Nandigram",	"Nangi",	"Nayagram community development block",	"North 24 Parganas district",	"Odlabari",	"Paikpara",	"Panagarh",	"Panchla",	"Panchmura",	"Pandua",	"Panihati",	"Panskura",	"Parbatipur",	"Paschim Medinipur district",	"Patiram",	"Patrasaer",	"Patuli",	"Pujali",	"Puncha community development block",	"Purba Medinipur district",	"Purulia",	"Raghudebbati",	"Raghunathpur",	"Raiganj",	"Rajmahal",	"Rajnagar community development block",	"Ramchandrapur",	"Ramjibanpur",	"Ramnagar",	"Rampur Hat",	"Ranaghat",	"Raniganj",	"Raypur",	"Rishra",	"Sahapur",	"Sainthia",	"Salanpur community development block",	"Sankarpur",	"Sankrail",	"Santipur",	"Santoshpur",	"Santuri community development block",	"Sarenga",	"Serampore",	"Serpur",	"Shyamnagar, West Bengal",	"Siliguri",	"Singur",	"Sodpur",	"Solap",	"Sonada",	"Sonamukhi",	"Sonarpur community development block",	"South 24 Parganas district",	"Srikhanda",	"Srirampur",	"Suri",	"Swarupnagar community development block",	"Takdah",	"Taki",	"Tamluk",	"Tarakeswar",	"Titagarh",	"Tufanganj",	"Tulin",	"Uchalan",	"Ula",	"Uluberia",	"Uttar Dinajpur district",	"Uttarpara Kotrung",
     ],
     ArunachalPradesh: [
      "Along",	"Anjaw",	"Basar",	"Bomdila",	"Changlang",	"Dibang Valley",	"East Kameng",	"East Siang",	"Hayuliang",	"Itanagar",	"Khonsa",	"Kurung Kumey",	"Lohit District",	"Lower Dibang Valley",	"Lower Subansiri",	"Margherita",	"Naharlagun",	"Pasighat",	"Tawang",	"Tezu",	"Tirap",	"Upper Siang",	"Upper Subansiri",	"West Kameng",	"West Siang",	"Ziro",
     ],
     Assam: [
      "Abhayapuri",	"Amguri",	"Badarpur",	"Baksa",	"Barpathar",	"Barpeta",	"Barpeta Road",	"Basugaon",	"Bihpuriagaon",	"Bijni",	"Bilasipara",	"Bokajan",	"Bokakhat",	"Bongaigaon",	"Cachar",	"Chabua",	"Chapar",	"Chirang",	"Darrang",	"Dergaon",	"Dhekiajuli",	"Dhemaji",	"Dhing",	"Dhubri",	"Dibrugarh",	"Digboi",	"Dima Hasao District",	"Diphu",	"Dispur",	"Duliagaon",	"Dum Duma",	"Gauripur",	"Goalpara",	"Gohpur",	"Golaghat",	"Golakganj",	"Goshaingaon",	"Guwahati",	"Haflong",	"Hailakandi",	"Hajo",	"Hojai",	"Howli",	"Jogighopa",	"Jorhat",	"Kamrup",	"Kamrup Metropolitan",	"Karbi Anglong",	"Karimganj",	"Kharupatia",	"Kokrajhar",	"Lakhimpur",	"Lakhipur",	"Lala",	"Lumding Railway Colony",	"Mahur",	"Maibong",	"Makum",	"Mangaldai",	"Mariani",	"Moranha",	"Morigaon",	"Nagaon",	"Nahorkatiya",	"Nalbari",	"Namrup",	"Nazira",	"North Guwahati",	"North Lakhimpur",	"Numaligarh",	"Palasbari",	"Raha",	"Rangapara",	"Rangia",	"Sapatgram",	"Sarupathar",	"Sibsagar",	"Silapathar",	"Silchar",	"Soalkuchi",	"Sonari",	"Sonitpur",	"Sorbhog",	"Tezpur",	"Tinsukia",	"Titabar",	"Udalguri",
     ],
     Chhattisgarh:[
      "Akaltara",	"Ambagarh Chauki",	"Ambikapur",	"Arang",	"Baikunthpur",	"Balod",	"Baloda",	"Baloda Bazar",	"Basna",	"Bastar",	"Bemetara",	"Bhanpuri",	"Bhatapara",	"Bhatgaon",	"Bhilai",	"Bijapur",	"Bilaspur",	"Champa",	"Chhuikhadan",	"Deori",	"Dhamtari",	"Dongargaon",	"Dongargarh",	"Durg",	"Gandai",	"Gariaband",	"Gaurela",	"Gharghoda",	"Gidam",	"Jagdalpur",	"Janjgir",	"Janjgir-Champa",	"Jashpur",	"Jashpurnagar",	"Junagarh",	"Kabeerdham",	"Kanker",	"Katghora",	"Kawardha",	"Khairagarh",	"Khamharia",	"Kharod",	"Kharsia",	"Kirandul",	"Kondagaon",	"Korba",	"Koriya",	"Kota",	"Kotaparh",	"Kumhari",	"Kurud",	"Lormi",	"Mahasamund",	"Mungeli",	"Narayanpur",	"Narharpur",	"Pandaria",	"Pandatarai",	"Pasan",	"Patan",	"Pathalgaon",	"Pendra",	"Pithora",	"Raigarh",	"Raipur",	"Raj Nandgaon",	"Raj-Nandgaon",	"Ramanuj Ganj",	"Ratanpur",	"Sakti",	"Saraipali",	"Sarangarh",	"Seorinarayan",	"Simga",	"Surguja",	"Takhatpur",	"Umarkot",	"Uttar Bastar Kanker",
     ], 
     Goa:[
      "Aldona",	"Arambol",	"Baga",	"Bambolim",	"Bandora",	"Benaulim",	"Calangute",	"Candolim",	"Carapur",	"Cavelossim",	"Chicalim",	"Chinchinim",	"Colovale",	"Colva",	"Cortalim",	"Cuncolim",	"Curchorem",	"Curti",	"Davorlim",	"Dicholi",	"Goa Velha",	"Guirim",	"Jua",	"Kankon",	"Madgaon",	"Mapuca",	"Morjim",	"Mormugao",	"Navelim",	"North Goa",	"Palle",	"Panaji",	"Pernem",	"Ponda",	"Quepem",	"Queula",	"Raia",	"Saligao",	"Sancoale",	"Sanguem",	"Sanquelim",	"Sanvordem",	"Serula",	"Solim",	"South Goa",	"Taleigao",	"Vagator",	"Valpoy",	"Varca",	"Vasco da Gama",
     ]

    }


    function makeSubmenu(value) {
      setState(value);
     
      

    if(value.length  === 0) document.getElementById("citySelect").innerHTML = "<option></option>";
    else {
    let citiesOptions = "";
    for( let cityId in citiesByState[value]) {
    citiesOptions+="<option>"+citiesByState[value][cityId]+"</option>";
    }
    document.getElementById("citySelect").innerHTML = citiesOptions;
    }
    }
 
    function resetSelection() {
    document.getElementById("countrySelect").selectedIndex = 0;
    document.getElementById("citySelect").selectedIndex = 0;
    }


   




  
  return (
    <div >
        
<section className=" " style={{backgroundColor:'#eee', marginTop:''}}>
  <div className="container  " style={{marginTop:'80px'}} >
  <Metadata title={'Register'}/>
    <div className="registermaindiv">
      <div className="">
        <div className="card6 rounded-3 text-black">
          <div className="registercontainer">
            <div className="" style={{}} >
              <div className=""   style={{width:'500px'}}>

                <div className='registermain' >
                  
                <form onSubmit={submitHandler} className='registerform'>
                  <p className='registerp' >Please Register</p>

                  <div className="form-outline mb-4">
                    <div className='registerformfield' >
                      <div className='label_div' >

                   
                      <div  >
                      <label className="labelregister" for="form2Example11"  style={{marginRight:'10px'}} >Phone No</label>

                      </div>
                      <div>
                        
                      <input type="tel"  
                      onChange={event=> setNumber(event.target.value)}
                          maxLength='10' id="form_input" className="form-control "

                              placeholder="" />

                      </div>
                    


                    </div>
                    </div>
                
                  </div>
                  <div className='verifybtn' >
                  {resend ? (
                  <button className="btnall"  disabled={verifydisplay ? 'disabled': ''}
                  onClick={otpHandler} 
                type="submit">Resend Otp</button>) :
                ( <button className="btnall" 
                  onClick={otpHandler} 
                type="submit">Verify</button>)}
                {  verifymessage && <p style={{color:'green',marginTop:'5px', marginLeft:'10px'}}  >Verified  <FaCheck/></p>}

                  </div>
                  {otpmessage && <p style={{color:'red'}} > {otpmessage}</p>}


                  
                  <div  style={ otpshow ? {marginLeft:'80px'} : {display:'none'}} >
        <div className="" style={{marginBottom:'20px'}}>
                
                <input type="tel"  id="form_input" className="form-control" maxLength='10'
                 onChange={event=> setOtp(event.target.value)}
                  placeholder="" required autofocus/>
                
              </div>

              <div className="" style={{marginLeft:'-100px'}}>
                <button className="btnall" 
               
                 onClick={verifyOtpHandler} type="submit">Verify Otp</button>
              </div>
              </div>
              {otpverifymessage && <p style={{color:'red'}}> {otpverifymessage}</p>}



                  <div className="form-outline mb-4">


                 <div className='registerformfield' >
                  <div className='label_div'>
                  <div>
                  <label className="labelregister" for="form2Example22" style={{marginRight:'40px'}} >Name</label>

                  </div>
                  <div>
                  <input type="text" id="form_input"
                      onChange={event=> setName(event.target.value)} className="form-control"   placeholder=""/>

                  </div>

                  </div>
                 </div>

                

                   
                  </div>

                   

                  <div className="form-outline mb-4">


                           <div className='registerformfield' >
                          <div className='label_div'>
                           <div>
                           <label className="labelregister" for="form2Example22" style={{marginRight:'45px'}} >Email</label>

                                 </div>
                              <div>
                              <input type="email"
                      onChange={event=> setEmail(event.target.value)} id="form_input" className="form-control"   placeholder=""/>

                         </div>

                          </div>
                          </div>



  
                               </div>



                               <div className="form-outline mb-4">


                               <div className='registerformfield' >
                           <div className='label_div'>
                              <div>
                              <label className="labelregister" for="form2Example22" style={{marginRight:'20px'}}  >Password</label>

                                 </div>
                                <div>
                                <input type="password" 
                     onChange={checkpassword} id="passfield" className="form-control"  placeholder="" />

                            </div>

                             </div>
                                </div>




                                 </div>




                
                 
                  <div style={displaybar?{}:{display:'none'}} >
                <div style={ color? {width:'140px', border:'2px solid green', marginLeft:'100px'}:{width:'140px', border:'2px dashed red', marginLeft:'100px'}}></div>
               
                
                <p style={ color ?{color:'green', marginTop:'-15px', fontSize:'14px', marginLeft:'50px'}:
                {color:'red', marginTop:'-15px', fontSize:'14px', marginLeft:'50px'}}>{color ?' Strong':'Weak'}</p>
                 </div>

                  <div  style={{display:'flex', marginTop:'10px'}}>
                    
                 
                  <div  className='state_div'>
                  <select  className='state_dropdown' id="countrySelect" size="1" onChange={(e)=>makeSubmenu(e.target.value)}>
                    <option value="" disabled selected>Choose State</option>
                    <option value="SelectState">Select State</option>
                        <option value="AndraPradesh">Andra Pradesh</option>
                        <option value="ArunachalPradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="HimachalPradesh">Himachal Pradesh</option>
                        <option value="JammuandKashmir">Jammu and Kashmir</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="MadyaPradesh">Madya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Orissa">Orissa</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="TamilNadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="UttarPradesh">Uttar Pradesh</option>
                        <option value="WestBengal">West Bengal</option>


                              </select>
                              </div>
                              <div className='city_div'>
                              <select 
                               onChange={event=> setCity(event.target.value)}
                              className='state_dropdown' id="citySelect" size="1" >
                 <option value={city}  disabled selected>Choose City</option>
                       <option></option>
                        </select>


                              </div>
                              </div>

                              <div>
                              <div className="form-outline mb-4">


                              <div className='registerformfield' >
                             <div className='label_div'>
                                  <div>
                                  <label className="labelregister" for="form2Example22"  style={{marginRight:'70px'}}>Pincode</label>

                                 </div>
                                   <div>
                                   <input type="tel" 
                                            onChange={event=> setPin(event.target.value)}
                    
                                              id="form2Example22" maxLength='6' className="form-control"  style={{width:'200px'}}  placeholder=""/>

                                      </div>

                                      </div>
                                        </div>




                                             </div>

                                       



                  
                              </div>

                              <div  className='assisted_div'>
                                <div  className="form-outline mb-4" > 
                                  

                                <div className='assistdiv' >
                                  <div className='assist_label' >
                                  <label className="labelregister" for="form2Example22"  style={{marginRight:'10px'}} >Assisted by</label>
                               
                               
                                     <input  className=''  id='checktick' type="checkbox" onClick={checkclick} />
                                  </div>
                                  <div  className='assist_field'>
                                  <input type="tel" 
                                      onChange={event=> setAssisted(event.target.value)}
                    
                                    id="formcheck"  className="form-control"  style={  assistedcheck ? {display:'block', marginLeft:'10px'}:{display:'none'}}  placeholder=""/>

                                  </div>



                                </div>

                               
                                      
                                            
                               


                                </div>
                              </div>
                 

                 
   

                   <div className='registerfooter' >
                   <div className="text-center pt-1 mb-1 pb-1" style={{marginTop:'-40px'}} >
                    <button  className="btnall" type='submit' onClick={submitHandler} 
                    >Register

                      </button>
                   
                  </div>

                  <div>
                    <p  style={{fontSize:'12px'}}>By creating an account you accept our</p>
                    <p  style={{fontSize:'12px', marginTop:'-20px', textDecoration:'underline'}}> <a href= '/terms&conditions'>Terms and conditions</a> </p>
                  </div>
                  {message && <p style={ color && color ?{color:'green'}:{color:'red'}} >{message}</p>}


                  <div className="d-flex align-items-center justify-content-center pb-4">
                    <p className="mb-0 me-2" style={{fontFamily:'Manrope, san-serif', fontSize:'15px', fontWeight:'bold'}}> have an account?</p>
                    <button type="button" className="btnall">
                    <Link className="" to="/loginnew"  style={{color:'black'}}>Login</Link>
                    </button>
                  </div>

                   </div>
               

                 
                 

                 

                </form>
                
                </div>
                

              </div>
            </div>
        
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      

     

    </div>
  )
}

export default Registernew
