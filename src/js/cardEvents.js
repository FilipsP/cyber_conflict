const cardEvents=[
    {
        task:{
            title: "Advisor:",
            body : "Our intelligence suggests that Inimicus is using 2 mobile applications (“Orange” and “Purple”) to influence the outcome of the war."
        },
        cards:
            [{
                title: "Attack “Orange”",
                icon: "assets/objects/card/icons/troy.png",
                body: "“Orange” is used to communicate with resistance forces in Patria, passing coded messages on military plans and targets.",
                feedback:"According to Rule 38 “Orange” can qualify as a military objective as it is making an effective contribution to military action. Disabling “Orange” and with it communication between the adversary and forces aligned with them can offer us a definite military advantage. Thus, this action does not go against the rules.",
                isLegal: true,
                economy: 0,
                security: 0.1
            },
                {
                    title: "Attack “Purple”",
                    icon: "assets/objects/card/icons/puppet.png",
                    body: "“Purple” is used to spread propaganda among our population. We have the ability to conduct Distributed Denial of Service (DDoS) attacks against one of the applications.",
                    feedback:"According to Rule 38, civilian objects, including cyber infrastructure that do not have an effective contribution to military action do not qualify as military objectives. Psychological operations, including spreading propaganda, are not excluded by the principle of distinction, that aims to protect civilians. Thus, “Purple” does not violate rules and can not be considered as a military objective. Attack on such civilian infrastructure may result in strict international response, such as sanctions.",
                    isLegal: false,
                    economy: -0.1,
                    security: 0
                }],
        adversaryAction: {
            economy: 0,
            security: 0,
            isLegal: false,
            body: "We have captured Inimicus’ agent who has infiltrated our facility and installed spyware to collect information from our military networks. The agent has been arrested and the spyware neutralised. The enemy action is within the limits of international law, according to Rule 66 on cyber espionage, which states that information gathering does not violate the laws of armed conflict. According to this rule the captured agent is not considered as a prisoner of war, but as a spy."
        }
    },
    {
        task:{
            title: "Advisor:",
            body : "Our engineers have developed two malwares, “Tom” and “Jerry”."
        },
        cards:
            [
                {
                    title: "Deploy “Jerry”",
                    icon: "assets/objects/card/icons/surgery.png",
                    body: "“Jerry” is designed to identify a specific process-control system and disable it, shutting down closed network of specific weapons factory.",
                    feedback:"Even though the scale of “Jerry’s” effect is much smaller, its effect can be directed and limited to a legitimate military objective, thus not violating Rules 43 and 49 prohibiting indiscriminate attacks and Rule 54 on minimising incidental damage to civilian objects. This is a legitimate action from our side.",
                    isLegal: true,
                    economy: 0,
                    security: 0.1
                },
                {
                    title: "Deploy “Tom”",
                    icon: "assets/objects/card/icons/firefire.png",
                    body: "“Tom” can be spread easily after introducing it to the adversary's network and cause disruptions resulting in disabling of functioning to a wide variety of systems.",
                    feedback:"Rules 43 and 49 prohibit indiscriminate attacks, while rule 54 calls for minimising incidental damage to civilian objects. “Tom” will affect not only the military infrastructure, but may penetrate and disrupt civilian infrastructure as well, which may include facilities of vital importance for civilians, potentially causing injuries and death. This type of indiscriminate action will result in strong condemnation from the international community and possibly, sanctions.",
                    isLegal: false,
                    economy: -0.1,
                    security: 0.1
                }],
        adversaryAction: {
            economy: 0,
            security: 0.1,
            isLegal: false,
            body: "Inimicus has conducted a cyberattack on our railway network which was used for civilian and military transport, disrupting the traffic. Because it was a dual-use object, Inimicus’ actions do not violate international law. According to Rule 39 objects that are used for both civilian and military purposes, including the rail network, can be considered as a military objective. (although this is not always clear cut, see the proportionality principle)."
        }
    },
    {
        task:{
            title: "Advisor:",
            body : "Our cyber operations team is now capable of disrupting adversaries' communication’s system. For this end there are two ways..."
        },
        cards:
            [
                {
                    title: "Attack Military Command",
                    icon: "assets/objects/card/icons/headshot.png",
                    body: "Attack the military command network directly, causing chaos and loss of control.",
                    feedback:"As per rule 56, this is the appropriate action as it yields the same result as the first option, but with causing less danger to civilians.",
                    isLegal: true,
                    economy: 0,
                    security: 0.1
                },
                {
                    title: "Attack dual-use system",
                    icon: "assets/objects/card/icons/dual.png",
                    body: "Disable Military/Civilian communications lines causing mass disruption and loss of communication possibly leading to the economical collapse of the enemy.",
                    feedback:"According to rule 56, when two possible attack options will yield the same result, we should choose the one that causes least danger to civilians. In this case the same result could have been achieved with the second option, while not endangering civilians by disrupting their communication lines as well. If the international investigation also finds that we had other, more appropriate choice leading to similar military advantage our actions will be condemned with the possibility of imposing sanctions.",
                    isLegal: false,
                    economy: -0.1,
                    security: 0.1
                }],
        adversaryAction: {
            economy: 0,
            security: 0,
            isLegal: true,
            body: "We have intercepted a coded communication between the military command network of Inimicus and one of its military units containing orders on planned military operations. We treat the information with caution, suspecting that it was intended for interception and contains false intelligence. This type of ruse of war is permitted during cyber operations according to Rule 61 of the Tallinn Manual."
        }
    },
    {
        task:{
            title: "Advisor:",
            body : "Our intelligence team informs us that there is a 13-year old boy, whose father was arrested for political motives by Inimicus. His family wishes to obtain asylum at Patria, but before that time he is able to deliver a flash drive containing malware to the adversary’s military facility. This will allow us to infiltrate Inimicus’ military network. How to proceed?"
        },
        cards:
            [
                {
                    title: "Use the boy",
                    icon: "assets/objects/card/icons/control.png",
                    body: "Use the boy to deliver malware, gain a significant advantage over Inimicus",
                    feedback:"It is prohibited to allow children to take part in military activities, including cyber operations. Tallinn Manual Rule 78, reflecting customary international law in prohibiting enlisting children and involving them in cyber operations. International sanctions may be imposed on State A for the violation of the rights of the child.",
                    isLegal: false,
                    economy: -0.1,
                    security: 0.1
                },
                {
                    title: "Do not proceed",
                    icon: "assets/objects/card/icons/stop.png",
                    body: "Do not proceed with this mission, loose the advantage over Inimicus",
                    feedback:"Even though introducing this malware to State B’s military network would have given us significant military advantage, it would have violated Rule 78 of Tallinn Manual prohibiting allowing children to take part in cyber hostilities. Our choice was the legal one in this situation. Our team will work on finding other ways to deliver the malware.",
                    isLegal: true,
                    economy: 0,
                    security: 0
                }],
        adversaryAction: {
            economy: -0.1,
            security: 0,
            isLegal: false,
            body: "We were informed that Inimicus conducted a cyberattack against the government's cyber infrastructure. The attack also affected the digital archives of the Patria’s Film Museum, which contained unique files that have survived only in digital format after the fire a few years ago at the archive. This cultural heritage is now lost. Rule 82 of the Tallinn Manual calls on states to respect and protect cultural property. We will bring this incident to the attention of the international community and demand strict sanctions."
        }
    },
    {
        task:{
            title: "Advisor:",
            body : "We suspect the web-page doodle.org which provides services for educational institutions may be used by Inimicus for transmitting military communication. At the moment it is only a suspicion and would need additional time and resources to confirm. While we proceed with the confirmation, Inimicus may have time to set up different communication channels. How should we proceed?"
        },
        cards:
            [
                {
                    title: "Attack!",
                    icon: "assets/objects/card/icons/bombs.png",
                    body: "Conduct DDoS attack on doodle.org immediately, no time to waste!",
                    feedback:"Rule 53 of the Tallinn Manual requires verification of targets when planning or ordering the attack by all feasible means, to make sure that objects attacked are not civilian. By refusing to take further steps for verification of the nature of the target we have violated this rule and may be subject to sanctions.",
                    isLegal: false,
                    economy: -0.1,
                    security: 0
                },
                {
                    title: "Verify data",
                    icon: "assets/objects/card/icons/eye.png",
                    body: "Verify if doodle.org is indeed used by Inimicus for military purposes and proceed with the attack only after confirmation. We can lose advantage",
                    feedback:"Doing everything feasible to verify that the targeted object is not a civilian object is the legal course of action and complies with the Rule 53 of the Tallinn Manual. Even though the verification process may take some time, this way we will be certain that the object is a legitimate target and our actions do not violate international law.",
                    isLegal: true,
                    economy: 0,
                    security: 0
                }],
        adversaryAction: {
            economy: -0.1,
            security: 0,
            isLegal: false,
            body: "Inimicus’ General Pitt has threatened to attack the water filtration system of our capital city, claiming that they will contaminate the water supply, which can lead to widespread diseases and death in the civilian population. This statement is aiming to terrorize the civilian population, which goes against international law. Rule 36 prohibits cyberattacks or threats that are aimed at terrorizing the civilian population. We expect the international community to respond to this violation and sanction Inimicus accordingly."
        }
    },
    {
        task:{
            title: "Advisor:",
            body : "Our society is demanding to answer the threats from General Pitt. Military command is considering 2 operations in response. Both involve our department sending a message to General Pitt disguised as a message from a major international media agency inviting him for an interview."
        },
        cards:
            [
                {
                    title: "Destroy the target",
                    icon: "assets/objects/card/icons/decapitation.png",
                    body: "Aim of this operation is is to conduct a drone attack to engage the target general. People get what they deserve",
                    feedback:"There is a bigger chance of success of the operation, but Patria will be violating international law. According to Rule 60, perfidy (an act inviting confidence of the adversary in order to betray that confidence) leading to their injury or death is prohibited. This will result in condemnation from the international society and sanctioning Patria.",
                    isLegal: false,
                    economy: -0.1,
                    security: 0.1
                },
                {
                    title: "Capture the target",
                    icon: "assets/objects/card/icons/prison.png",
                    body: "Aim of this operation is to try and capture him but the chances of success are lower, as the operation would take place on the enemy territory and the General has a very skilled security team.",
                    feedback:"Even though the chances of success of this operation are small, this is the legal choice of action. Rule 60 specifies, that perfidy (an act inviting confidence of the adversary in order to betray that confidence) leading to their injury or death is prohibited, but if we manage to capture General Pitt unharmed, Patria will not be violating international law.",
                    isLegal: true,
                    economy: 0,
                    security: 0
                }],
        adversaryAction: {
            economy: -0.1,
            security: 0.1,
            isLegal: false,
            body: "Inimicus has sent malware containing a kill-switch to the employee of the biggest windmill farm in the country which is providing electricity to civilian and military objects in the region. Malware was disguised as test results from a medical facility. It temporarily disrupted the power production at the windmill farm. This type of malware, disguised to persuade the victim that it is safe and related to other activities, such as medical activities, represents a cyber-booby trap, which according to Rule 44 of the Tallinn Manual is forbidden. We will bring this illegal act to the attention of the international society and demand sanctions for Inimicus."
        }
    },
    {
        task:{
            title: "Advisor:",
            body : "Our team has been planning a cyberattack directed at a small enemy military unit occupying a strategic location in the bordering region, that will cause an explosion on the territory of the military base. However, updated intelligence shows that at the moment there is a large concentration of civilian population near this territory."
        },
        cards:
            [
                {
                    title: "Proceed with the attack",
                    icon: "assets/objects/card/icons/building.png",
                    body: "The explosion may cause civilian harm. We are at war...",
                    feedback:"International investigation has found that anticipated military advantage of the attack was disproportionately smaller than the harm caused to civilians. Rule 57 calls for the suspension of an attack in such circumstances. This action resulted in imposition of strict sanctions.",
                    isLegal: false,
                    economy: -0.1,
                    security: 0.1
                },
                {
                    title: "Suspend the attack",
                    icon: "assets/objects/card/icons/value.png",
                    body: "It's not worth it. Every life matters",
                    feedback:"According to rule 57, when it is clear that anticipated military advantage is not proportionate to the expected harm to the civilian population, planned operation should be cancelled or suspended. This was the right choice. The operation can be conducted when the intelligence suggests that civilian presence of the territory has ceased or at least diminished significantly.",
                    isLegal: true,
                    economy: 0,
                    security: -0.1
                }],
        adversaryAction: {
            economy: 0,
            security: 0.1,
            isLegal: true,
            body: "Inimicus has conducted a cyberattack allowing them to take control over our guided weapons systems. One of the guided missiles aimed at the enemy military installation was redirected and fell on an open field, killing one bystander. Even though the cyber operation resulted in a civilian casualty, this attack may be considered proportional. Inimicus claims that there was no way of anticipating and preventing civilian death. Rules 51 and 58 of Tallinn Manual address the proportionality and requirement to take precaution during the attack. According to our investigation Inimicus has not violated international laws as the target was legitimate and did not violate rules 51 and 58."
        }
    },
    {
        task:{
            title: "Advisor:",
            body : "Inimicus is planning a military invasion. The invasion will come from the uninhabited bordering region. There are two water reservoirs at the enemy territory in the region  Hydro 1 and Hydro 2. Hydro 1 is a smaller reservoir, while Hydro 2 is a large dam. Our team is capable of infiltrating reservoirs’ SCADA (supervisory control and data acquisition) systems and releasing the water from one of the reservoirs. How should we proceed?"
        },
        cards:
            [
                {
                    title: "Choose Hydro 2",
                    icon: "assets/objects/card/icons/flood.png",
                    body: "Releasing water from Hydro 2 would cause severe flooding of the area for a longer period of time, minimising the chances of a military attack from that region.",
                    feedback:"Rules 80 and 83 of Tallinn Manual, based on the I Additional Protocol to Geneva Conventions calls for the particular care when conduction attacks against installations containing dangerous forces, such as dams and states that the natural environment which is considered as a civilian object enjoys general protection and prohibits actions resulting in widespread, long-term and severe damage to the natural environment. As the water released from Hydro 2 has covered a large area, causing severe and widespread impact that will last for a long period of time, our action has violated international law and we have become subject to severe international sanctions crippling our economy.",
                    isLegal: false,
                    economy: -0.1,
                    security: 0.2
                },
                {
                    title: "Choose Hydro 1",
                    icon: "assets/objects/card/icons/bottle_of_water.png",
                    body: "Water from Hydro 1 would flood some parts of the area for several days and would temporarily halt the military invasion from that territory.",
                    feedback:"We have stalled the invasion for only several days, but this was the legal move, as Rules 80 and 83 of the Tallinn Manual calls for the particular care when conduction attacks against installations containing dangerous forces, such as dams and states that the natural environment which is considered as a civilian object enjoys general protection. This rule based on the I Additional Protocol to Geneva Conventions prohibits actions resulting in widespread, long-term and severe damage to the natural environment. Releasing water from Hydro 1 will have a limited, short-term effect and will not cause severe damage.",
                    isLegal: true,
                    economy: 0,
                    security: 0.1
                }],
        adversaryAction: {
            economy: -0.2,
            security: 0,
            isLegal: false,
            body: "We have received information that State B has conducted a cyberattack that affected the power supply of the main hospital where dozens of critically injured civilians were being treated on life support. State B claims that medical computer systems were used for non-humanitarian purposes, but have not provided proof. State B has also not provided warning about the loss of protection and reasonable time limit for compliance, violating Rule 73 of the Tallinn Manual on loss of protection and warning. Their illegal action has resulted in severe international sanctions from the international community crippling their economy."
        }
    }
]

/*
Const cards=
    [
        {
            title:"Brute-force",
            icon:"assets/objects/card/icons/bruteforce.png",
            body:"Deploy your digital brute-force prowess to breach enemy defenses. This card allows you to target a single opponent's security system, attempting to overpower their defenses through sheer computational strength. Success could provide you with valuable intelligence or disrupt their operations"

        },
        {
            title:"Mass Disruption",
            icon:"assets/objects/card/icons/puppet.png",
            body:" Unleash chaos across the digital battlefield with the \"Mass Disruption\" card. When played, this card can disrupt multiple enemy systems simultaneously, causing temporary chaos and confusion among your rivals. Use it strategically to gain the upper hand or disrupt your opponents' well-laid plans"
        }
    ]
*/

export default cardEvents
