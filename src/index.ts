import { performance } from 'perf_hooks';
import { CliColors } from './utils/CliColors';

const selectedChallenge: string = (process.argv[2] || '1').padStart(2, '0');
const selectedChallengeInt: number = parseInt(selectedChallenge, 10);

const dayInt = (selectedChallengeInt % 2 === 0) ? selectedChallengeInt / 2 : (selectedChallengeInt + 1) / 2;
const paddedDay = dayInt.toString(10).padStart(2, '0');

import(`./challenges/day-${paddedDay}/challenge-${selectedChallenge}`).then(m => {
  const startTime = performance.now();
  const answer = new m.default().solve();
  const endTime = performance.now();

  console.log(`${CliColors.FgCyan}The answer to challenge`,
    CliColors.FgMagenta + selectedChallenge,
    `${CliColors.FgCyan}is: `,
    CliColors.FgBlack + CliColors.BgGreen + ' ' + answer,
    `${CliColors.Reset + CliColors.FgBlue} and took`,
    `${CliColors.FgYellow}${(endTime - startTime).toFixed(3)}ms`,
    `${CliColors.FgBlue}to compute`,
    CliColors.Reset,
  );
}).catch((e) => {
  console.log(e);
  console.log(CliColors.FgRed + 'You have to write some code first!' + CliColors.Reset);
});