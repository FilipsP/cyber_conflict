import gameState from "./gameState.js";

const endings =  {
    securityCouncil:{
        title:"You lose... but:",
        body:"Plot twist you are on a security council and don't give a shit. While conducting cyber operations you have violated several international laws applicable to cyber warfare. These grave violations have resulted in severe international sanctions. International society expresses concern and asks the UN Security Council to take action. But, guessing from your blatant disregard for international rules and laws and resorting to brute force, one can deduce that you are not concerned about the sanctions and the denouncements from the international community. Possibly, Patria is even a permanent member of the Security Council with veto power and will block any attempt to conduct an international investigation for crimes committed by its commanders during the conflict. But nothing lasts forever…",
        bg:"secret"
    },

    lose:{
        title:"You lose:",
        body: "Patria has been severely sanctioned for violating international laws applicable to cyber warfare. These sanctions have destroyed the country's economy and rendered it unable to continue its military operations. Patria had to concede to Inimicus. The commanders and superiors of Patria responsible for giving orders that violate the laws of war will face legal consequences. As they were acting as the agents of Patria, the issue of state responsibility arises. Inimicus demands reparations in the form of financial retributions from Patria for the illegal acts committed during the conflict. Inimicus can use the financial retributions to invest in cyber defence and strengthen its own security.",
        bg: "lose"
    },
    tie: {
        title:"Tie, cease-fire:",
        body: "None of you can continue fighting, both facing legal consequences as both Patria and Inimicus have been severely sanctioned by the international community for the illegal acts committed during the war, the economies of both countries have been severely affected, and neither are able to continue military operations. A cease-fire has been negotiated. The superiors and commanders from both states responsible for giving orders that violate the laws of war will face legal consequences. Everybody gets what they deserve.",
        bg:"neutral"
    },
    weakWin: {
        title:"Win but weakened:",
        body: "Demand reparations. You have, in most part, managed to conduct cyber operations against the enemy in line with the international laws applicable to cyber warfare. Patria’s economy has been somewhat weakened by the sanctions imposed for the violations of laws of war. On the other hand, the world also takes notice of your responsible conduct. Inimicus faces severe sanctions from the international community for the grave violations they had committed. These sanctions have weakened their economy significantly and rendered them unable to continue military operations. The commanders and superiors responsible for giving orders that violate the laws of war will face legal consequences. As they were acting as the agents of Inimicus, the issue of state responsibility arises, and Patria can demand reparations from Inimicus for the illegal acts committed and damage sustained as a result of these acts in the form of financial retribution.",
        bg:"weak_win"
    },
    clearWin: {
        title:"Clear win",
        body: "You have managed to conduct cyber operations against the enemy in line with the international laws applicable to cyber warfare. The adversary has committed several grave violations of these laws, leading to the imposition of severe sanctions from the international community. These sanctions have weakened their economy significantly and rendered them unable to continue military operations. Inimicus has ceased all cyber and military operations and admitted defeat. The commanders and superiors of Inimicus responsible for giving orders that violate the laws of war will face legal consequences.",
        bg:"clear_win"
    }
}

export default function getEnding(){
    const economy = gameState.playerData.economy
    const security = gameState.playerData.security
    if (economy < 0.5 && security >= 0.9){
        return endings.securityCouncil
    }
    if ((economy < 0.5 && security >= 0.5)||(economy === 0.5 && security === 0.4)){
        return endings.lose
    }
    if (economy === 0.5){
        return endings.tie
    }
    if ((security === 40 && (economy === 60||economy === 70))||(security === 30 && (economy >= 60&&economy!==1))){
        return endings.weakWin
    }
    return endings.clearWin
}