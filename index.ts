import { performance } from 'perf_hooks';
import * as Challenges from './src/challenges';
import { CliColors } from './src/utils/CliColors';

const selectedChallenge = (process.argv[2] || '1').padStart(2, '0');


if (Challenges['Challenge' + selectedChallenge]){
  const startTime = performance.now();
  const answer = new Challenges['Challenge' + selectedChallenge]().solve();
  const endTime = performance.now();

  console.log(`${CliColors.FgCyan}The answer to challenge`,
    CliColors.FgMagenta+selectedChallenge,
    `${CliColors.FgCyan}is: `,
    CliColors.FgBlack+CliColors.BgGreen+' '+answer,
    `${CliColors.Reset+CliColors.FgBlue} and took`,
    `${CliColors.FgYellow}${(endTime - startTime).toFixed(3)}ms`,
    `${CliColors.FgBlue}to compute`,
    CliColors.Reset,
  );
}else{
  console.log(CliColors.FgRed+'You have to write some code first!'+CliColors.Reset);
}
