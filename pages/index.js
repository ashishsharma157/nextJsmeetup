import MeetupList from "../components/meetups/MeetupList";
import Layout from '../components/layout/Layout';
import { MongoClient } from "mongodb";

const DUMMY = [
  {
    id: "m1",
    title: "A first meet up",
    image:
      "https://cdn.prod.website-files.com/619c916dd7a3fa284adc0b27/65fadedbb6aa925d4ffaf3f0_fb350b1d-34b7-466b-a693-dbf3af0d93f7.jpeg",
    address: "Some address 5, some city",
    description: "This is first meet up",
  },
  {
    id: "m2",
    title: "A second meet up",
    image:
      "https://cdn.prod.website-files.com/619c916dd7a3fa284adc0b27/65fadedbb6aa925d4ffaf3f0_fb350b1d-34b7-466b-a693-dbf3af0d93f7.jpeg",
    address: "Some address 10, some city 1",
    description: "This is second meet up",
  },
];
function HomePage(props) {

  return <MeetupList meetups={props.meetups} />;
}

 export async function getStaticProps(){
  const client = await MongoClient.connect(
    "mongodb+srv://sharmaashish78:9Ha0CVJBwxBYfQj9@cluster0.9aior.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const data=await meetupsCollection.find().toArray();
   return{
     props:{
       meetups: data.map(meetup=>({
        title:meetup.title,
        image: meetup.image,
        address:meetup.address,
        description:meetup.description,
        id:meetup._id.toString()
       }))
     },
     revalidate:10
   }

 }
// export async function getServerSideProps(context) {
//   //const req=context.req;
//   //const res=context.res;
//   return {
//     props:{
//       meetups:DUMMY
//     }
//   }
// }
export default HomePage;
