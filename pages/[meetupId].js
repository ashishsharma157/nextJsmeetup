import { MongoClient, ObjectId } from "mongodb";

import MeetupDetail from "../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://sharmaashish78:9Ha0CVJBwxBYfQj9@cluster0.9aior.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const data = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: data.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const id = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://sharmaashish78:9Ha0CVJBwxBYfQj9@cluster0.9aior.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const data = await meetupsCollection.findOne({ _id: new ObjectId(id), });
  client.close();

  return {
    props: {
      meetupData: {
        id: data._id.toString(),
        title: data.title,
        description: data.description,
        address: data.address,
        image: data.image,
      },
    },
  };
}
export default MeetupDetails;
