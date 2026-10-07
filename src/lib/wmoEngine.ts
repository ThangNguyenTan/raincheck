export interface WeatherVibe {
  code: number;
  condition: string;
  emoji: string;
  iconName: 'Sun' | 'Moon' | 'CloudSun' | 'CloudMoon' | 'Cloud' | 'CloudFog' | 'CloudDrizzle' | 'CloudRain' | 'CloudLightning' | 'CloudSnow' | 'CloudHail' | 'Flame' | 'Snowflake' | 'Wind';
  bgColor: string;
  accentColor: string;
  roastTitle: string;
  roastQuote: string;
  hazardLevel: 'SAFE' | 'SWEATY' | 'SLIPPERY' | 'SOAKED' | 'DANGER' | 'APOCALYPTIC' | 'FREEZING' | 'MELTING';
  advice: string;
  isExtremeTemp?: boolean;
}

interface WMOConditionConfig {
  condition: string;
  day: {
    emoji: string;
    iconName: WeatherVibe['iconName'];
    bgColor: string;
    accentColor: string;
    titles: string[];
    quotes: string[];
    hazard: WeatherVibe['hazardLevel'];
    advice: string;
  };
  night: {
    emoji: string;
    iconName: WeatherVibe['iconName'];
    bgColor: string;
    accentColor: string;
    titles: string[];
    quotes: string[];
    hazard: WeatherVibe['hazardLevel'];
    advice: string;
  };
}

const WMO_MAP: Record<number, WMOConditionConfig> = {
  // 0: Clear sky
  0: {
    condition: 'Clear Sky',
    day: {
      emoji: '☀️',
      iconName: 'Sun',
      bgColor: '#FFE600', // Radiant Neo Yellow
      accentColor: '#FF4757',
      titles: ['Solar Laser Beam', 'Sunscreen Won\'t Save You', 'Photons on Maximum', 'Big Light in the Sky'],
      quotes: [
        'The sun is aggressively staring right at you.',
        'Zero clouds. Zero excuses to stay inside, yet here we are.',
        'Great day for plants, terrible day for your screen visibility.',
        'Congratulations, you have been selected for natural vitamin D overdose.'
      ],
      hazard: 'SWEATY',
      advice: 'Slap on SPF 5000 or accept your fate as human bacon.'
    },
    night: {
      emoji: '🌙',
      iconName: 'Moon',
      bgColor: '#2C2C54', // Dark Neo Indigo
      accentColor: '#00E5FF',
      titles: ['Vampire Paradise', 'Midnight Goblin Hours', 'Total Celestial Void', 'Clear Night Protocol'],
      quotes: [
        'Not a cloud to hide your late-night life regrets.',
        'The moon is shining brightly on your bad sleep schedule.',
        'The stars are out wondering why you\'re checking the weather at this hour.',
        'Vampires rejoice. Crisp air, no blinding giant space fireball.'
      ],
      hazard: 'SAFE',
      advice: 'Go to sleep or at least stop doomscrolling under the starlight.'
    }
  },

  // 1: Mainly clear
  1: {
    condition: 'Mainly Clear',
    day: {
      emoji: '🌤️',
      iconName: 'CloudSun',
      bgColor: '#FFDE59',
      accentColor: '#2ED573',
      titles: ['Almost Perfect', 'The Sun Is Flirting', 'Decent Day Anomaly', 'Cloud Censorship Lite'],
      quotes: [
        'A few lazy clouds tried to RSVP, but gave up.',
        'Optimal conditions for touching grass (warning: contains outside).',
        'Weather is behaving suspiciously well. Do not trust it.',
        'Just enough blue sky to give you false hope.'
      ],
      hazard: 'SAFE',
      advice: 'Go outside for 4 minutes before your introversion kicks in.'
    },
    night: {
      emoji: '🌑',
      iconName: 'CloudMoon',
      bgColor: '#341F97',
      accentColor: '#FF9FF3',
      titles: ['Mood Lighting Active', 'Cryptid Hours', 'Starlight Filtered', 'Cosmic Ambience'],
      quotes: [
        'A few clouds photobombing the moon tonight.',
        'Ideal darkness for suspicious nighttime snack foraging.',
        'Crisp, calm, and slightly eerie in a cinematic way.',
        'The stars are giving a 4/5 star review tonight.'
      ],
      hazard: 'SAFE',
      advice: 'Lock the doors and enjoy the midnight calm.'
    }
  },

  // 2: Partly cloudy
  2: {
    condition: 'Partly Cloudy',
    day: {
      emoji: '⛅',
      iconName: 'CloudSun',
      bgColor: '#48DBFB', // Electric Cyan
      accentColor: '#FF6B6B',
      titles: ['Sky Indecision', 'Sun Playing Hide & Seek', 'Cloud Buffering: 50%', 'Half-Baked Shade'],
      quotes: [
        'The atmosphere cannot make up its damn mind.',
        'Clouds providing intermittent shade like a flickery motel light.',
        'Good luck deciding whether to wear a jacket or shorts.',
        'Even the weather has commitment issues today.'
      ],
      hazard: 'SAFE',
      advice: 'Dress in layers like an emotional onion.'
    },
    night: {
      emoji: '🌥️',
      iconName: 'CloudMoon',
      bgColor: '#222f3e',
      accentColor: '#00d2d3',
      titles: ['Moon Peek-a-Boo', 'Nebula Cosplay', 'Cloud Patchwork', 'Shadow Tag'],
      quotes: [
        'The moon is playing peek-a-boo with some fluffy trespassers.',
        'Breezy, dim, and moody enough for a Spotify indie playlist.',
        'Neither clear nor stormy. Just mediocre nocturnal vibes.',
        'The sky looks like a patchwork quilt thrown over a lamp.'
      ],
      hazard: 'SAFE',
      advice: 'Good night for a moody drive with lo-fi beats.'
    }
  },

  // 3: Overcast
  3: {
    condition: 'Overcast',
    day: {
      emoji: '☁️',
      iconName: 'Cloud',
      bgColor: '#A4B0BE', // Muted Industrial Slate
      accentColor: '#57606F',
      titles: ['Depression Grey™', 'Render Distance: Low', 'God Turned Off the Lights', 'Visual Smog Filter'],
      quotes: [
        'The sky looks like wet concrete and so does your outlook today.',
        'The world forgot to pay its electricity bill for the sun.',
        'Uniform grey ceiling. Nature is running on low graphics settings.',
        'A 100% chance of feeling sluggish and craving carbs.'
      ],
      hazard: 'SAFE',
      advice: 'Drink 3 cups of coffee and pretend you have energy.'
    },
    night: {
      emoji: '☁️',
      iconName: 'Cloud',
      bgColor: '#1E272E',
      accentColor: '#808E9B',
      titles: ['Pitch Dark Blanket', 'Zero Visibility Void', 'Sky Lid Sealed', 'No Stars For You'],
      quotes: [
        'Total optical blackout above. No stars, just cloud foam.',
        'The sky feels 10 feet lower than usual.',
        'Even the moon gave up and called in sick.',
        'Pitch darkness. Beware of stubbing your toe on reality.'
      ],
      hazard: 'SAFE',
      advice: 'Stay in bed. The outside world has been temporarily disabled.'
    }
  },

  // 45: Fog
  45: {
    condition: 'Foggy',
    day: {
      emoji: '🌫️',
      iconName: 'CloudFog',
      bgColor: '#747D8C', // Foggy Slate
      accentColor: '#CED6E0',
      titles: ['Render Distance: 2m', 'Silent Hill DLC', 'Vape Cloud Horizon', 'Graphics Glitch'],
      quotes: [
        'The graphics card in the sky is struggling to render polygons.',
        'Expect to encounter mysterious figures offering cursed side quests.',
        'You can’t see 10 feet ahead, which might be a blessing.',
        'Mother nature has inhaled too much vape juice.'
      ],
      hazard: 'SLIPPERY',
      advice: 'Walk slowly and watch out for pyramid heads.'
    },
    night: {
      emoji: '🌫️',
      iconName: 'CloudFog',
      bgColor: '#2F3542',
      accentColor: '#A4B0BE',
      titles: ['Horror Movie Setup', 'Victorian Ghost Alley', 'Mist of the Damned', 'Where is the Road?'],
      quotes: [
        'If you hear eerie violin music outside, run.',
        'Perfect night for an encounter with a 19th-century ghost.',
        'You can barely see your own front door.',
        'Total atmospheric spookiness. 10/10 haunt potential.'
      ],
      hazard: 'DANGER',
      advice: 'Do not follow faint whispers into dark alleys.'
    }
  },

  // 48: Depositing rime fog
  48: {
    condition: 'Depositing Rime Fog',
    day: {
      emoji: '🥶',
      iconName: 'CloudFog',
      bgColor: '#70A1FF',
      accentColor: '#3742FA',
      titles: ['Flash Freeze Frost', 'Icy Spiderweb Mist', 'Crystalline Glaze', 'Nature\'s Freezer Burn'],
      quotes: [
        'Fog so cold it turns telephone poles into popsicles.',
        'Every tree branch is coated in razor-sharp frost crystals.',
        'The air hurts to inhale. Welcome to the walk-in freezer.',
        'Frosted glass aesthetic, minus the cozy coffee shop vibe.'
      ],
      hazard: 'SLIPPERY',
      advice: 'Watch your footing before your spine meets the pavement.'
    },
    night: {
      emoji: '🧊',
      iconName: 'CloudFog',
      bgColor: '#192A56',
      accentColor: '#70A1FF',
      titles: ['Subzero Glaze', 'Cryo Chamber Lockdown', 'Black Ice Delivery', 'Hypothermia Express'],
      quotes: [
        'The mist is actively gluing frost to every metal surface.',
        'Licking a flagpole right now will end your bloodline.',
        'Deadly quiet, freezing cold, and slippery as hell.',
        'Your breath is freezing before it leaves your mouth.'
      ],
      hazard: 'FREEZING',
      advice: 'Wrap yourself in every blanket you own.'
    }
  },

  // 51: Light Drizzle
  51: {
    condition: 'Light Drizzle',
    day: {
      emoji: '🌦️',
      iconName: 'CloudDrizzle',
      bgColor: '#7BED9F', // Muted Mint
      accentColor: '#2ED573',
      titles: ['Passive Aggressive Mist', 'Sky Droplet Spit', 'Humid Static', 'Anti-Hair Spray'],
      quotes: [
        'Not wet enough for an umbrella, wet enough to ruin your hair.',
        'The sky is timidly spitting on you with minimal effort.',
        'Nature\'s lukewarm spray bottle punishment.',
        'You look like a damp dog, but technically it\'s barely raining.'
      ],
      hazard: 'SLIPPERY',
      advice: 'Put your hood up and complain quietly.'
    },
    night: {
      emoji: '🌧️',
      iconName: 'CloudDrizzle',
      bgColor: '#1E3799',
      accentColor: '#6A89CC',
      titles: ['Damp Solitude', 'Neon Puddle Season', 'Midnight Mist Droplets', 'Lukewarm Drip'],
      quotes: [
        'A sad little drizzle glistening against the streetlights.',
        'The rain is too tired to pour properly.',
        'Slightly damp melancholy outside your window.',
        'It’s basically high-altitude sweat floating downward.'
      ],
      hazard: 'SLIPPERY',
      advice: 'Watch out for slick zebra crossings.'
    }
  },

  // 53, 55: Moderate to Dense Drizzle
  53: {
    condition: 'Moderate Drizzle',
    day: {
      emoji: '🌧️',
      iconName: 'CloudDrizzle',
      bgColor: '#70A1FF',
      accentColor: '#1E90FF',
      titles: ['Constant Mist Assault', 'Liquid Air Simulation', 'Soggy Socks Pending', 'Persistent Dampness'],
      quotes: [
        'The air is 98% moisture and 2% disappointment.',
        'Your glasses are officially fogged and water-spotted.',
        'It’s not torrential, but it won’t stop nagging you.',
        'Goodbye dry jacket, hello damp sponge lifestyle.'
      ],
      hazard: 'SLIPPERY',
      advice: 'Take the umbrella or prepare for musty sweater smells.'
    },
    night: {
      emoji: '🌧️',
      iconName: 'CloudDrizzle',
      bgColor: '#0C2461',
      accentColor: '#4A69BD',
      titles: ['Nocturnal Sponge Mode', 'The Endless Spritz', 'Drenched Sidewalks', 'Moody Drizzle Loop'],
      quotes: [
        'The kind of drizzle that sneaks through waterproof seams.',
        'The streets are mirror-slick with endless mini droplets.',
        'Everything smells like wet asphalt and petrichor.',
        'Even the stray cats are shaking their heads in disgust.'
      ],
      hazard: 'SLIPPERY',
      advice: 'Tuck in your pant hems or regret it forever.'
    }
  },

  // 56, 57: Freezing Drizzle
  56: {
    condition: 'Freezing Drizzle',
    day: {
      emoji: '🥶',
      iconName: 'CloudDrizzle',
      bgColor: '#A8D8EA',
      accentColor: '#AA96DA',
      titles: ['Liquid Glaze of Doom', 'Invisible Skating Rink', 'Freezer Burn Spritz', 'Tailbone Obliteration Risk'],
      quotes: [
        'The rain hits the road and instantly turns to slick glass.',
        'Physics is laughing as your rubber soles lose all friction.',
        'Every driveway is now an unmonitored curling tournament.',
        'Do not run. Do not jog. Shuffle like a fearful penguin.'
      ],
      hazard: 'FREEZING',
      advice: 'Waddle like a penguin or break your tailbone.'
    },
    night: {
      emoji: '🧊',
      iconName: 'CloudDrizzle',
      bgColor: '#0A3D62',
      accentColor: '#82CCDD',
      titles: ['Black Ice Ambush', 'Permafrost Glaze', 'The Slick Trap', 'Zero Traction Protocol'],
      quotes: [
        'The pavement looks wet, but it is actually polished ice.',
        'Your car door is already glued shut by icy shellac.',
        'Stepping outside tonight is a voluntary stunt audition.',
        'Cars are doing unintentional Tokyo Drifts at 5 mph.'
      ],
      hazard: 'DANGER',
      advice: 'Stay inside. Physics has revoked friction.'
    }
  },

  // 61: Slight Rain
  61: {
    condition: 'Slight Rain',
    day: {
      emoji: '🌦️',
      iconName: 'CloudRain',
      bgColor: '#54A0FF',
      accentColor: '#2E86DE',
      titles: ['Standard Drenching', 'The Wet Routine', 'Umbrella Roulette', 'Liquid Patter'],
      quotes: [
        'Decent rain. Time to see if your umbrella has missing ribs.',
        'The sidewalks are slick and shoes are squeaking.',
        'Raindrops falling right into your freshly washed hair.',
        'At least you don’t have to water your dead balcony plants.'
      ],
      hazard: 'SOAKED',
      advice: 'Deploy umbrella or face the squeaky-shoe walk of shame.'
    },
    night: {
      emoji: '🌧️',
      iconName: 'CloudRain',
      bgColor: '#1B1464',
      accentColor: '#00A8FF',
      titles: ['Blade Runner City Vibe', 'Neon Splash Symphony', 'Rain on the Windowpanes', 'Puddle Hop Hours'],
      quotes: [
        'Pitter-patter sound on the glass. Prime sleeping weather.',
        'City lights reflecting on wet tarmac look surprisingly aesthetic.',
        'Stepping into a surprise ankle-deep puddle will ruin your night.',
        'Good excuse to order food and tip the courier well.'
      ],
      hazard: 'SOAKED',
      advice: 'Avoid curbside puddles when cars speed past.'
    }
  },

  // 63: Moderate Rain
  63: {
    condition: 'Moderate Rain',
    day: {
      emoji: '🌧️',
      iconName: 'CloudRain',
      bgColor: '#0ABDE3',
      accentColor: '#10AC84',
      titles: ['Soggy Shoes Guarantee', 'Car Wash (Organic)', 'Sky Plumbing Leak', 'Puddle Jump Championship'],
      quotes: [
        'Your socks will be wet by noon. It has been foretold.',
        'Your windshield wipers are frantically battling for survival.',
        'The clouds have emptied their bladders without shame.',
        'Forget the stylish boots, wear scuba fins.'
      ],
      hazard: 'SOAKED',
      advice: 'Carry spare dry socks in a ziplock bag. Seriously.'
    },
    night: {
      emoji: '🌧️',
      iconName: 'CloudRain',
      bgColor: '#10375C',
      accentColor: '#0ABDE3',
      titles: ['Heavy Drip Drone', 'Soggy Slumber', 'Night Torrent Mode', 'The Downpour Drone'],
      quotes: [
        'The rain is drumming on the roof like an anxious woodpecker.',
        'Going out now requires full waterproof battle armor.',
        'The street gutters are flowing like miniature rapids.',
        'Optimal environment for hot noodles and zero guilt.'
      ],
      hazard: 'SOAKED',
      advice: 'Roll up the windows before your upholstery sprouts mushrooms.'
    }
  },

  // 65: Heavy Rain
  65: {
    condition: 'Heavy Rain',
    day: {
      emoji: '🌊',
      iconName: 'CloudRain',
      bgColor: '#2E86DE',
      accentColor: '#EE5253',
      titles: ['Noah\'s Ark 2.0', 'Free Public Waterpark', 'Curtain of Water', 'Atlantis Auditions'],
      quotes: [
        'Who provoked Poseidon today? Step forward and apologize.',
        'Your umbrella will flip inside out within 14 seconds.',
        'Drains are overflowing and streets are now Class 2 rivers.',
        'You are 10 seconds away from aquatic evolution.'
      ],
      hazard: 'APOCALYPTIC',
      advice: 'Build a raft or cancel every single commitment.'
    },
    night: {
      emoji: '⛈️',
      iconName: 'CloudRain',
      bgColor: '#061a40',
      accentColor: '#FF6B6B',
      titles: ['Midnight Deluge', 'The Sky Floodgates Failed', 'Gothic Tempest', 'Drown Your Plans'],
      quotes: [
        'Sheets of water slamming the window glass furiously.',
        'Do not try driving unless your vehicle has a propeller.',
        'The gutters sound like a roaring waterfall.',
        'Stay indoors or prepare for a complimentary baptism.'
      ],
      hazard: 'APOCALYPTIC',
      advice: 'Put sandbags at the threshold and stay dry.'
    }
  },

  // 66, 67: Freezing Rain
  66: {
    condition: 'Freezing Rain',
    day: {
      emoji: '🧊',
      iconName: 'CloudRain',
      bgColor: '#48DBFB',
      accentColor: '#FF4757',
      titles: ['Liquid Nitrogen Prank', 'Armor of Glaze', 'The Slippery Trap', 'Tree Branch Snapper'],
      quotes: [
        'Rain that turns into armor on impact. Trees are bowing down.',
        'Your car resembles a frozen glazed donut right now.',
        'Power lines are sagging under the weight of transparent ice.',
        'Stepping outside is a 100% gamble on your skeleton’s integrity.'
      ],
      hazard: 'DANGER',
      advice: 'Do not de-ice with hot water or your windshield will pop.'
    },
    night: {
      emoji: '🧊',
      iconName: 'CloudRain',
      bgColor: '#0C2461',
      accentColor: '#FF4757',
      titles: ['Glazed Calamity', 'Ice Shard Rainstorm', 'Power Grid Roulette', 'Frost Trap'],
      quotes: [
        'The rain is encasing everything in dangerous glossy crystal.',
        'Expect power flickers and tree branches cracking in the dark.',
        'Your doorstep is coated with slick Teflon ice.',
        'Walking out the front door will test your acrobatics.'
      ],
      hazard: 'DANGER',
      advice: 'Charge your phone and locate your emergency candles.'
    }
  },

  // 71: Slight Snow
  71: {
    condition: 'Slight Snow',
    day: {
      emoji: '🌨️',
      iconName: 'CloudSnow',
      bgColor: '#DFF9FB',
      accentColor: '#130F40',
      titles: ['Free Powder Dusting', 'Flurry Flurry Joy', 'Dandruff of the Gods', 'Chilly Confetti'],
      quotes: [
        'A dainty dusting of snow for your Instagram story.',
        'Just enough snow to make you look festive for 3 minutes.',
        'Pretty to look at, mildly annoying to brush off your coat.',
        'Flakes floating gently down like frozen styrofoam.'
      ],
      hazard: 'SLIPPERY',
      advice: 'Put on gloves before your fingertips turn purple.'
    },
    night: {
      emoji: '🌨️',
      iconName: 'CloudSnow',
      bgColor: '#130F40',
      accentColor: '#7ED6DF',
      titles: ['Silent Night Snowfall', 'Moonlit Flurry', 'Quiet Powder Coat', 'Flurry Whisper'],
      quotes: [
        'The world sounds magically muffled under fresh snow.',
        'Snowflakes glowing under street lamps like tiny disco balls.',
        'Cold, silent, and peaceful until you have to shovel tomorrow.',
        'Freezing air, warm blankets: optimal ratio.'
      ],
      hazard: 'SLIPPERY',
      advice: 'Hot cocoa is legally mandatory right now.'
    }
  },

  // 73, 75: Moderate to Heavy Snow
  73: {
    condition: 'Moderate to Heavy Snow',
    day: {
      emoji: '❄️',
      iconName: 'CloudSnow',
      bgColor: '#C7ECEE',
      accentColor: '#30336B',
      titles: ['Snowmageddon Lite', 'Whiteout Wonder', 'Snowbank Paradise', 'Blizzard Apprentice'],
      quotes: [
        'The driveway has disappeared. Your car is now a snow loaf.',
        'You need a shovel, two scarves, and extreme patience.',
        'Visibility is plummeting and snow is packing into boots.',
        'Snowballs are heavy and dangerous. Watch your 6.'
      ],
      hazard: 'FREEZING',
      advice: 'Find your snow boots or accept frozen socks.'
    },
    night: {
      emoji: '❄️',
      iconName: 'CloudSnow',
      bgColor: '#1E272E',
      accentColor: '#00D2D3',
      titles: ['Midnight Blizzard Drift', 'Whiteout In The Dark', 'Subzero Tundra', 'Yeti Patrol'],
      quotes: [
        'The snow is piling up while the town is fast asleep.',
        'You won’t recognize where the curb ends tomorrow morning.',
        'Wind blowing powdery snow into hypnotic white ribbons.',
        'Stepping outside requires polar expedition equipment.'
      ],
      hazard: 'FREEZING',
      advice: 'Keep the heater humming and don’t shovel until dawn.'
    }
  },

  // 77: Snow Grains
  77: {
    condition: 'Snow Grains',
    day: {
      emoji: '🌨️',
      iconName: 'CloudSnow',
      bgColor: '#E056FD',
      accentColor: '#686DE0',
      titles: ['Sky Polystyrene Beads', 'Frozen Sugar Sprinkles', 'Miniature Ice Pellets', 'Tiny Hail Wannabes'],
      quotes: [
        'Tiny hard grains bouncing off your jacket like uncooked rice.',
        'Nature is pelting you with organic freeze-dried Dippin\' Dots.',
        'Not snow, not hail, just weird crunchy precipitation.',
        'Sounds like someone throwing grains of salt at the window.'
      ],
      hazard: 'SLIPPERY',
      advice: 'Don’t eat the mystery white grains.'
    },
    night: {
      emoji: '🌨️',
      iconName: 'CloudSnow',
      bgColor: '#30336B',
      accentColor: '#BE2EDD',
      titles: ['Grain Assault', 'Crunchy Night Sky', 'Mini Ice Pellets', 'Frozen Rice Spatter'],
      quotes: [
        'Tiny white pellets rattling against parked cars.',
        'Crunchy footsteps in the dark.',
        'The sky is dispensing micro-ice cubes on high speed.',
        'Chilly, strange, and prickly against the cheeks.'
      ],
      hazard: 'SLIPPERY',
      advice: 'Bundle up tight against the pelting grains.'
    }
  },

  // 80, 81, 82: Rain Showers
  80: {
    condition: 'Rain Showers',
    day: {
      emoji: '🌦️',
      iconName: 'CloudRain',
      bgColor: '#00E5FF', // Neon Cyan
      accentColor: '#FF3838',
      titles: ['Surprise Soak Attack', 'Shower Curtain Malfunction', 'Sky Squirt Gun', 'Hit-and-Run Rainfall'],
      quotes: [
        'Sunny one second, drowned rat the next. Classic trap.',
        'The rain arrived uninvited, soaked your shoes, and left.',
        'You opened the umbrella right when it stopped. Well played.',
        'Tactical rain showers designed specifically to ruin picnics.'
      ],
      hazard: 'SOAKED',
      advice: 'Keep that umbrella locked and loaded for quick draw.'
    },
    night: {
      emoji: '🌧️',
      iconName: 'CloudRain',
      bgColor: '#1B1464',
      accentColor: '#00E5FF',
      titles: ['Sudden Midnight Dump', 'Nocturnal Squall', 'Midnight Splatter', 'Rooftop Drum Solo'],
      quotes: [
        'Sudden aggressive squall shaking the leaves outside.',
        'Rooftop water cascades like a broken bath valve.',
        'Just enough rain to wake you up with dramatic splatters.',
        'Rapid showers rolling through the neighborhood.'
      ],
      hazard: 'SOAKED',
      advice: 'Check that all windows are latched tight.'
    }
  },

  // 85, 86: Snow Showers
  85: {
    condition: 'Snow Showers',
    day: {
      emoji: '🌨️',
      iconName: 'CloudSnow',
      bgColor: '#67E6DC',
      accentColor: '#3B3B98',
      titles: ['Quickie Blizzard', 'Snow Flurry Burst', 'Freezer Door Left Open', 'Sudden White Veil'],
      quotes: [
        'Out of nowhere, a heavy burst of snow blankets the street.',
        'The sky emptied a bag of cotton balls directly on your head.',
        'Fast-moving snow bands playing tag with the pavement.',
        'A burst of winter drama that will melt in 4 hours.'
      ],
      hazard: 'SLIPPERY',
      advice: 'Take cautious baby steps on newly powdered walkways.'
    },
    night: {
      emoji: '❄️',
      iconName: 'CloudSnow',
      bgColor: '#182C61',
      accentColor: '#67E6DC',
      titles: ['Nocturnal Snow Squall', 'Ghostly White Flurry', 'The Swift Tundra Burst', 'Midnight Frost Rush'],
      quotes: [
        'Dense snow flurry tearing through the night streets.',
        'Visibility dropped to zero for 10 minutes then cleared.',
        'Fresh fluffy layer laid down in minutes.',
        'Silent, cold, and unexpectedly heavy.'
      ],
      hazard: 'FREEZING',
      advice: 'Sleep through it; shoveling is tomorrow’s problem.'
    }
  },

  // 95: Thunderstorm
  95: {
    condition: 'Thunderstorm',
    day: {
      emoji: '⚡',
      iconName: 'CloudLightning',
      bgColor: '#FF4757', // High Impact Neo Crimson
      accentColor: '#FFE600',
      titles: ['Thor\'s Meltdown', 'Sky Amp at Volume 11', 'Zeus Had a Bad Day', 'High Voltage Atmosphere'],
      quotes: [
        'Nature is setting off cosmic flashbangs without a trigger warning.',
        'The bass drop from the sky is shaking your fillings loose.',
        'Your dog has already filed a restraining order against the clouds.',
        'Static electricity is turning your hair into an anime protagonist.'
      ],
      hazard: 'DANGER',
      advice: 'Unplug expensive electronics and stay away from tall trees.'
    },
    night: {
      emoji: '🌩️',
      iconName: 'CloudLightning',
      bgColor: '#2C061F', // Dark Electric Plum
      accentColor: '#FFE600',
      titles: ['Night Rave in the Clouds', 'Lightning Strobe Party', 'Midnight Thunder Clap', 'Cosmic Bass Cannon'],
      quotes: [
        'The sky turns midday violet every 8 seconds from flashes.',
        'Thunder so loud your car alarms are crying for help.',
        'Free strobe light show with intense rumble subwoofers.',
        'Nature’s EDM festival is right outside your bedroom.'
      ],
      hazard: 'DANGER',
      advice: 'Stay away from windows and enjoy the primal lightshow.'
    }
  },

  // 96, 99: Thunderstorm with Hail
  96: {
    condition: 'Thunderstorm with Hail',
    day: {
      emoji: '☄️',
      iconName: 'CloudHail',
      bgColor: '#9C27B0', // Royal Brutal Violet
      accentColor: '#FF4757',
      titles: ['Sky Pellet Artillery', 'Hail Cannon Activated', 'Ice Shrapnel Assault', 'Car Insurance Nightmare'],
      quotes: [
        'The sky is actively hurling golf balls of solid ice at your skull.',
        'Dent repair shops are popping champagne right now.',
        'It sounds like machine gun fire against corrugated metal.',
        'Do NOT step outside unless you are wearing a medieval helmet.'
      ],
      hazard: 'APOCALYPTIC',
      advice: 'Get your car under a roof and keep your helmet on.'
    },
    night: {
      emoji: '☄️',
      iconName: 'CloudHail',
      bgColor: '#1B003B',
      accentColor: '#FFE600',
      titles: ['Night Bombardment', 'Ice Shrapnel In The Dark', 'Hailstorm Siege', 'Heaven\'s Slingshot'],
      quotes: [
        'Golf ball ice crashing down into the darkness at 60 mph.',
        'Every roof in a 5-mile radius is getting pounded into drums.',
        'Severe storm warnings going off like emergency sirens.',
        'Do not go look out the skylight unless you like shattering glass.'
      ],
      hazard: 'APOCALYPTIC',
      advice: 'Huddle in an interior room and pray for your car windows.'
    }
  }
};

// Fallback resolver for codes that might be variations
function getBaseConfig(code: number): WMOConditionConfig {
  if (WMO_MAP[code]) return WMO_MAP[code];

  // Map ranges
  if (code >= 51 && code <= 55) return WMO_MAP[53] || WMO_MAP[51];
  if (code >= 56 && code <= 57) return WMO_MAP[56];
  if (code >= 61 && code <= 65) return WMO_MAP[code] || WMO_MAP[63];
  if (code >= 66 && code <= 67) return WMO_MAP[66];
  if (code >= 71 && code <= 75) return WMO_MAP[code] || WMO_MAP[73];
  if (code >= 80 && code <= 82) return WMO_MAP[80];
  if (code >= 85 && code <= 86) return WMO_MAP[85];
  if (code >= 95 && code <= 99) return WMO_MAP[96] || WMO_MAP[95];

  // Default to partly cloudy if unknown
  return WMO_MAP[2];
}

export function resolveVibe(code: number, tempC: number, isDay: number): WeatherVibe {
  const config = getBaseConfig(code);
  const variant = isDay === 0 ? config.night : config.day;

  // Random quote and title selection from available options
  const randomTitle = variant.titles[Math.floor(Math.random() * variant.titles.length)];
  const randomQuote = variant.quotes[Math.floor(Math.random() * variant.quotes.length)];

  // Default base vibe
  let vibe: WeatherVibe = {
    code,
    condition: config.condition,
    emoji: variant.emoji,
    iconName: variant.iconName,
    bgColor: variant.bgColor,
    accentColor: variant.accentColor,
    roastTitle: randomTitle,
    roastQuote: randomQuote,
    hazardLevel: variant.hazard,
    advice: variant.advice,
    isExtremeTemp: false
  };

  // EXTREME TEMPERATURE OVERRIDES
  // 1. Extreme Heat (>= 35°C)
  if (tempC >= 35) {
    const heatQuotes = [
      'Welcome to the interior of a preheated air fryer.',
      'Even the pigeons are drinking iced lattes under air conditioner drips.',
      'Touching your car steering wheel will transfer your fingerprints to the afterlife.',
      'The pavement is officially baking artisan sourdough.'
    ];
    const heatTitles = [
      'Air Fryer Mode: MAX',
      'Solar Death Ray Protocol',
      'Sweat Gland Meltdown',
      'The Floor is Lava (Literally)'
    ];

    vibe = {
      ...vibe,
      emoji: '🔥',
      iconName: 'Flame',
      bgColor: '#FF3838', // Molten Fire Red
      accentColor: '#FFE600',
      roastTitle: heatTitles[Math.floor(Math.random() * heatTitles.length)],
      roastQuote: heatQuotes[Math.floor(Math.random() * heatQuotes.length)],
      hazardLevel: 'MELTING',
      advice: 'Hydrate constantly or evaporate into a fine vapor.',
      isExtremeTemp: true
    };
  }
  // 2. Extreme Cold (<= -10°C)
  else if (tempC <= -10) {
    const coldQuotes = [
      'Your nose hairs will freeze into brittle icicles in 3 seconds.',
      'Even penguins are filing complaints with HR about this temperature.',
      'Your warm breath is now solid matter. Stay near the furnace.',
      'Stepping outside feels like a personal hate crime from the Arctic.'
    ];
    const coldTitles = [
      'Antarctica Cosplay',
      'Absolute Zero Wannabe',
      'Cryo Chamber Simulator',
      'Frostbite Speedrun'
    ];

    vibe = {
      ...vibe,
      emoji: '🥶',
      iconName: 'Snowflake',
      bgColor: '#70A1FF', // Glacier Ice Blue
      accentColor: '#3742FA',
      roastTitle: coldTitles[Math.floor(Math.random() * coldTitles.length)],
      roastQuote: coldQuotes[Math.floor(Math.random() * coldQuotes.length)],
      hazardLevel: 'FREEZING',
      advice: 'Put on 4 layers or lose your fingers to the void.',
      isExtremeTemp: true
    };
  }

  return vibe;
}

export const PRESET_CONDITIONS = [
  { label: '☀️ Clear Sun', code: 0, tempC: 28, isDay: 1, name: 'Clear Sky' },
  { label: '🌙 Clear Night', code: 0, tempC: 19, isDay: 0, name: 'Clear Night' },
  { label: '☁️ Overcast', code: 3, tempC: 16, isDay: 1, name: 'Overcast' },
  { label: '🌫️ Foggy', code: 45, tempC: 14, isDay: 1, name: 'Fog' },
  { label: '🌧️ Heavy Rain', code: 65, tempC: 21, isDay: 1, name: 'Heavy Rain' },
  { label: '⚡ Thunderstorm', code: 95, tempC: 24, isDay: 1, name: 'Thunderstorm' },
  { label: '☄️ Hail Assault', code: 96, tempC: 18, isDay: 1, name: 'Hail Storm' },
  { label: '❄️ Blizzard', code: 73, tempC: -4, isDay: 1, name: 'Snowstorm' },
  { label: '🔥 Air Fryer Heat', code: 0, tempC: 39, isDay: 1, name: 'Extreme Heat' },
  { label: '🥶 Deep Freeze', code: 71, tempC: -15, isDay: 1, name: 'Polar Cold' },
];
