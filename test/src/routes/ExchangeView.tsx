
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import React from 'react';
import { Avatar } from '@mantine/core';
import exchangesImport from '../mockData/exchanges';
import usersImport from '../mockData/users';

export default function ExchangeView () {
    const [exchange, setExchange] = React.useState(null);
    const [participantsLanguageOne, setParticipantsLanguageOne] = React.useState([]);
    const [participantsLanguageTwo, setParticipantsLanguageTwo] = React.useState([]);
    React.useEffect(() => {
        fetch('https://randomuser.me/api/')
          .then(results => results.json())
          .then(data => {
            const {name} = data.results[0];
            console.log(name);
            setExchange(exchangesImport[0]);
            const participantsLanguageOne = usersImport.filter((user) => exchangesImport[0].participantIds.includes(user.id) && user.teachingLanguage.toLowerCase() === exchangesImport[0].languageOne.toLowerCase())
            const participantsLanguageTwo = usersImport.filter((user) => exchangesImport[0].participantIds.includes(user.id) && user.learningLanguage.toLowerCase() === exchangesImport[0].languageOne.toLowerCase())
            setParticipantsLanguageOne(participantsLanguageOne);
            setParticipantsLanguageTwo(participantsLanguageTwo);
            
          });
      }, []); // <-- Have to pass in [] here!

    return exchange && (<Card shadow="sm" padding="lg" radius="md" withBorder>
    <Card.Section>
      <Image
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
        height={160}
        alt="Norway"
      />
    </Card.Section>

    <Group justify="space-between" mt="md" mb="xs">
      <Text fw={900}>Exchange at {exchange.location}</Text>
    </Group>
    <Badge color="pink"><svg  xmlns="http://www.w3.org/2000/svg"  width="14"  height="14"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-users"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg> {exchange.participants} / {exchange.capacity}</Badge>
    <Group justify="space-between" mt="md" mb="xs">
      <Text fw={400} style={{display: 'flex'}}>
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-calendar-month"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M7 14h.013" /><path d="M10.01 14h.005" /><path d="M13.01 14h.005" /><path d="M16.015 14h.005" /><path d="M13.015 17h.005" /><path d="M7.01 17h.005" /><path d="M10.01 17h.005" /></svg>
        <div>{exchange.time}</div>
      </Text>
    </Group>
    <Group justify="space-between" mt="md" mb="xs">
      <Text fw={400} style={{display: 'flex'}}>
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-clock"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 7v5l3 3" /></svg>
        <div>{exchange.duration}</div>
      </Text>
    </Group>
    <Group justify="space-between" mt="md" mb="xs">
      <Text fw={400} style={{display: 'flex'}}>
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-coin"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 0 1 -1.8 -1" /><path d="M12 7v10" /></svg>
        <div>{exchange.price ? 'free' : exchange.price}</div>
      </Text>
    </Group>
    <Text size="sm" c="dimmed">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus rerum expedita soluta suscipit? Hic quisquam mollitia laborum fugiat, molestiae provident alias architecto nulla cumque accusamus veritatis odit iste officia explicabo!
    </Text>
    <Text fw={900}>Who's going?</Text>

    <div className='participants-container'>
        <div className='flex'>
            <div style={{padding: '30px'}}>
                <Text fw={500}>{ exchange.languageOne }: {exchange.participantsLanguageOne} / {exchange.capacity / 2} participants</Text>
                <div className='flex-col' style={{paddingTop: '20px'}}>
                    {participantsLanguageOne.length > 0 && participantsLanguageOne.map((plo) => {
                        return (<>
                            <Avatar src="avatar.png" alt="it's me" size="xl" style={{marginTop: '10px'}}/>
                            <div>{plo.avatar}</div>
                            <div>{plo.username}</div>
                            </>
                        )
                    })}
                </div>
            </div>
            <div style={{padding: '30px'}}>
                <Text fw={500}>{ exchange.languageTwo }: {exchange.participantsLanguageTwo} / {exchange.capacity / 2} participants</Text>
                <div className='flex-col' style={{paddingTop: '20px'}}>
                    {participantsLanguageTwo.length > 0 && participantsLanguageTwo.map((plo) => {
                        return (<>
                            <Avatar src="avatar.png" alt="it's me" size="xl" style={{marginTop: '10px'}}/>
                            <div>{plo.avatar}</div>
                            <div>{plo.username}</div>
                            </>
                        )
                    })}
                </div>
            </div>
        </div>            
    </div>
    <Text fw={900}>Where?</Text>

    <Button color="blue" fullWidth mt="md" radius="md">
      Join
    </Button>
  </Card>)
}

