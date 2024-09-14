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
  return {
    fallback:false,
    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  const id = context.params.meetupId;
  return {
    props: {
      meetupData: {
        image:
          "https://cdn.prod.website-files.com/619c916dd7a3fa284adc0b27/65fadedbb6aa925d4ffaf3f0_fb350b1d-34b7-466b-a693-dbf3af0d93f7.jpeg",
        title: "The first meet up",
        id:id,
        address: "Some address 5, Some City",
        description: "Meetup description",
      },
    },
  };
}
export default MeetupDetails;
