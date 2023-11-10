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
                body: "“Orange” is used to communicate with resistance forces in Patria, passing coded messages on military plans and targets",
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
            body: "We have captured Inimicus’ agent who has infiltrated our facility and installed spyware to collect information from our military networks. The agent has been arrested and the spyware neutralised. The enemy action is within the limits of international law, according to Rule 66 on cyber espionage, which states that information gathering does not violate the laws of armed conflict. According to this rule the captured agent is not considered as a prisoner of war, but as a spy"
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
                    body: "“Jerry” is designed to identify a specific process-control system and disable it, shutting down closed network of specific weapons factory",
                    feedback:"Even though the scale of “Jerry’s” effect is much smaller, its effect can be directed and limited to a legitimate military objective, thus not violating Rules 43 and 49 prohibiting indiscriminate attacks and Rule 54 on minimising incidental damage to civilian objects. This is a perfectly legal action from our side.",
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
            body: "Inimicus has conducted a cyber attack on our railway network which was used for civilian and military transport, disrupting the traffic. Because it was a dual-use object, Inimicus’ actions do not violate international law. According to Rule 39 objects that are used for both civilian and military purposes, including the rail network, can be considered as a military objective. (although this is not always clear cut, see the proportionality principle)"
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
                    feedback:"As per rule 56, this is the appropriate action as it yields the same result as the first option, but with causing less danger to civilians",
                    isLegal: true,
                    economy: 0,
                    security: 0.1
                },
                {
                    title: "Attack dual-use system",
                    icon: "assets/objects/card/icons/dual.png",
                    body: "Disable Military/Civilian communications lines causing mass disruption and loss of communication possibly leading to the economical collapse of the enemy.",
                    feedback:"According to rule 56, when two possible attack options will yield the same result, we should choose the one that causes least danger to civilians. In this case the same result could have been achieved with the second option, while not endangering civilians by disrupting their communication lines as well. If the international investigation also finds that we had other, more appropriate choice leading to similar military advantage our actions will be condemned with the possibility of imposing sanctions",
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
