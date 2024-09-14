import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";

import { MongoClient } from "mongodb";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React learn meetup</title>
        <meta name='description' content='this is test for new learning'/>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://sharmaashish78:9Ha0CVJBwxBYfQj9@cluster0.9aior.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const data = await meetupsCollection.find().toArray();
  return {
    props: {
      meetups: data.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
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
