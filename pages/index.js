import Head from 'next/head'
import { MongoClient } from 'mongodb'
import { Fragment, useEffect, useState } from 'react'
import MeetupList from '../components/meetups/MeetupList'


function HomePage(props) {
    return (
        <Fragment>
            <Head >
                <title>Meetup page</title>
                <meta name='description' content='Here is All meet up'></meta>
            </Head>
            <MeetupList meetups={props.meetups}></MeetupList>
        </Fragment>
    )
}
// export async function getServerSideProps(context) {
//     const req=context.req
//     const res=context.res
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://jajjibhai007:kamlajani007@cluster0.vaxfc.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db()

    const meetupCollections = db.collection('meetups')
    const meetups = await meetupCollections.find().toArray()

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => (
                {
                    title: meetup.title,
                    image: meetup.image,
                    address: meetup.address,
                    id: meetup._id.toString(),
                }
            ))
        },
        revalidate: 1
    }
}

export default HomePage