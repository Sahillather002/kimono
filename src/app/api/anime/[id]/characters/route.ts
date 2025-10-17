import { NextRequest, NextResponse } from 'next/server'
import { JikanAPI } from '@/lib/jikan-api'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    // Get characters from Jikan API
    const characters = await JikanAPI.getAnimeCharacters(id)
    
    return NextResponse.json(characters)
  } catch (error) {
    console.error('Characters API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch characters' },
      { status: 500 }
    )
  }
}

// Old mock database - can be removed
/*
const mockCharactersDatabase: Record<string, Character[]> = {
  "1": [
    {
      id: "char-1-1",
      name: {
        first: "Eren",
        last: "Yeager",
        full: "Eren Yeager",
        native: "エレン・イェーガー"
      },
      image: "https://cdn.myanimelist.net/images/characters/11/311327.jpg",
      description: "The main protagonist of Attack on Titan. Eren is a passionate and determined young man who seeks freedom for humanity.",
      role: "Main",
      voiceActors: [
        {
          id: "va-1-1",
          name: "Yuki Kaji",
          image: "https://cdn.myanimelist.net/images/voiceactors/1/54519.jpg",
          language: "Japanese"
        },
        {
          id: "va-1-2",
          name: "Bryce Papenbrook",
          image: "https://cdn.myanimelist.net/images/voiceactors/2/63385.jpg",
          language: "English"
        }
      ]
    },
    {
      id: "char-1-2",
      name: {
        first: "Mikasa",
        last: "Ackerman",
        full: "Mikasa Ackerman",
        native: "ミカサ・アッカーマン"
      },
      image: "https://cdn.myanimelist.net/images/characters/2/358939.jpg",
      description: "Eren's childhood friend and a skilled soldier. Mikasa is fiercely protective of Eren and possesses exceptional combat abilities.",
      role: "Main",
      voiceActors: [
        {
          id: "va-1-3",
          name: "Yui Ishikawa",
          image: "https://cdn.myanimelist.net/images/voiceactors/3/64567.jpg",
          language: "Japanese"
        },
        {
          id: "va-1-4",
          name: "Trina Nishimura",
          image: "https://cdn.myanimelist.net/images/voiceactors/4/67890.jpg",
          language: "English"
        }
      ]
    },
    {
      id: "char-1-3",
      name: {
        first: "Armin",
        last: "Arlert",
        full: "Armin Arlert",
        native: "アルミン・アルレルト"
      },
      image: "https://cdn.myanimelist.net/images/characters/3/478923.jpg",
      description: "Eren's childhood friend and a brilliant strategist. Armin uses his intelligence to help humanity in their fight against the titans.",
      role: "Main",
      voiceActors: [
        {
          id: "va-1-5",
          name: "Marina Inoue",
          image: "https://cdn.myanimelist.net/images/voiceactors/5/71234.jpg",
          language: "Japanese"
        },
        {
          id: "va-1-6",
          name: "Josh Grelle",
          image: "https://cdn.myanimelist.net/images/voiceactors/6/74567.jpg",
          language: "English"
        }
      ]
    },
    {
      id: "char-1-4",
      name: {
        first: "Levi",
        last: "Ackerman",
        full: "Levi Ackerman",
        native: "リヴァイ・アッカーマン"
      },
      image: "https://cdn.myanimelist.net/images/characters/4/567890.jpg",
      description: "Humanity's strongest soldier. Levi is a captain in the Survey Corps known for his incredible combat skills and strict demeanor.",
      role: "Supporting",
      voiceActors: [
        {
          id: "va-1-7",
          name: "Hiroshi Kamiya",
          image: "https://cdn.myanimelist.net/images/voiceactors/7/78901.jpg",
          language: "Japanese"
        },
        {
          id: "va-1-8",
          name: "Matthew Mercer",
          image: "https://cdn.myanimelist.net/images/voiceactors/8/82345.jpg",
          language: "English"
        }
      ]
    }
  ],
  "2": [
    {
      id: "char-2-1",
      name: {
        first: "Tanjiro",
        last: "Kamado",
        full: "Tanjiro Kamado",
        native: "竈門 炭治郎"
      },
      image: "https://cdn.myanimelist.net/images/characters/11/123456.jpg",
      description: "The main protagonist of Demon Slayer. Tanjiro is a kind-hearted boy who becomes a demon slayer to save his sister and avenge his family.",
      role: "Main",
      voiceActors: [
        {
          id: "va-2-1",
          name: "Natsuki Hanae",
          image: "https://cdn.myanimelist.net/images/voiceactors/9/91234.jpg",
          language: "Japanese"
        },
        {
          id: "va-2-2",
          name: "Zach Aguilar",
          image: "https://cdn.myanimelist.net/images/voiceactors/10/94567.jpg",
          language: "English"
        }
      ]
    },
    {
      id: "char-2-2",
      name: {
        first: "Nezuko",
        last: "Kamado",
        full: "Nezuko Kamado",
        native: "竈門 禰豆子"
      },
      image: "https://cdn.myanimelist.net/images/characters/12/234567.jpg",
      description: "Tanjiro's younger sister who was turned into a demon. Despite being a demon, she retains some humanity and protects humans.",
      role: "Main",
      voiceActors: [
        {
          id: "va-2-3",
          name: "Akari Kitō",
          image: "https://cdn.myanimelist.net/images/voiceactors/11/97890.jpg",
          language: "Japanese"
        },
        {
          id: "va-2-4",
          name: "Abby Trott",
          image: "https://cdn.myanimelist.net/images/voiceactors/12/101234.jpg",
          language: "English"
        }
      ]
    },
    {
      id: "char-2-3",
      name: {
        first: "Zenitsu",
        last: "Agatsuma",
        full: "Zenitsu Agatsuma",
        native: "我妻 善逸"
      },
      image: "https://cdn.myanimelist.net/images/characters/13/345678.jpg",
      description: "A fellow demon slayer who is cowardly but incredibly powerful when unconscious. Zenitsu uses Thunder Breathing techniques.",
      role: "Supporting",
      voiceActors: [
        {
          id: "va-2-5",
          name: "Hiro Shimono",
          image: "https://cdn.myanimelist.net/images/voiceactors/13/104567.jpg",
          language: "Japanese"
        },
        {
          id: "va-2-6",
          name: "Aleks Le",
          image: "https://cdn.myanimelist.net/images/voiceactors/14/107890.jpg",
          language: "English"
        }
      ]
    }
  ],
  "3": [
    {
      id: "char-3-1",
      name: {
        first: "Light",
        last: "Yagami",
        full: "Light Yagami",
        native: "夜神 月"
      },
      image: "https://cdn.myanimelist.net/images/characters/14/456789.jpg",
      description: "The main protagonist of Death Note. Light is a brilliant high school student who discovers the Death Note and decides to rid the world of criminals.",
      role: "Main",
      voiceActors: [
        {
          id: "va-3-1",
          name: "Mamoru Miyano",
          image: "https://cdn.myanimelist.net/images/voiceactors/15/111234.jpg",
          language: "Japanese"
        },
        {
          id: "va-3-2",
          name: "Brad Swaile",
          image: "https://cdn.myanimelist.net/images/voiceactors/16/114567.jpg",
          language: "English"
        }
      ]
    },
    {
      id: "char-3-2",
      name: {
        first: "L",
        last: "Lawliet",
        full: "L Lawliet",
        native: "エル・ローライト"
      },
      image: "https://cdn.myanimelist.net/images/characters/15/567890.jpg",
      description: "The world's greatest detective who is tasked with catching Kira. L is eccentric but brilliant in his methods.",
      role: "Main",
      voiceActors: [
        {
          id: "va-3-3",
          name: "Kappei Yamaguchi",
          image: "https://cdn.myanimelist.net/images/voiceactors/17/117890.jpg",
          language: "Japanese"
        },
        {
          id: "va-3-4",
          name: "Alessandro Juliani",
          image: "https://cdn.myanimelist.net/images/voiceactors/18/121234.jpg",
          language: "English"
        }
      ]
    }
  ]
}
*/