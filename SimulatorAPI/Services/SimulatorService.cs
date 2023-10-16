using SimulatorAPI.Models;

namespace SimulatorAPI.Services
{
    public class SimulatorService
    {
        public SimulationOutput GenerateSimulatorOutput(SimulationInput simulationInput)
        {
            var results = SimulateMontyHallGame(simulationInput.SimulationCount, simulationInput.SwitchDoor);
            var wins = results.Count(result => result);
            var losses = simulationInput.SimulationCount - wins; //results.Count(result => !result)

            var winRate = Math.Round(((double)wins / simulationInput.SimulationCount) * 100, 2);
            var lossRate = Math.Round(((double)losses / simulationInput.SimulationCount) * 100, 2);

            var simulationOutput = new SimulationOutput
            {
                UserInput = simulationInput,
                WinRate = winRate,
                LossRate = lossRate
            };
            return simulationOutput;
        }

        private List<bool> SimulateMontyHallGame(int simulationCount, bool switchDoor)
        {
            var random = new Random();
            var results = new List<bool>();

            for (var i = 0; i < simulationCount; i++)
            {
                try
                {
                    var carDoor = random.Next(3); // Randomly generate the door behind which the car will be placed [door 0,1,2]
                    var playerDoor = random.Next(3); // Randomly select a door to represent player's initial choice

                    // Returns a list of doors (excluding player's door and car door)
                    var goatDoors = Enumerable.Range(0, 3).Where(index => index != playerDoor && index != carDoor).ToList();
                    var presenterDoor = goatDoors[random.Next(goatDoors.Count)]; //depending on the doors available, presenter randomly opens a goat door. 

                    var remainingDoor = Enumerable.Range(0, 3).Except(new[] { playerDoor, presenterDoor }).Single(); //find the door that is neither chosen by the player nor opened by the presenter
                    var playerFinalDoor = switchDoor ? remainingDoor : playerDoor; // Determine the final door chosen by player depending on the switchDoor boolean
                    results.Add(playerFinalDoor == carDoor); // add true into results list if player wins the car and false if not
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Exception in simulation iteration {i}: {ex.Message}"); //Log exceptions
                    results.Add(false); // to keep the win percentages accurate despite exceptions
                }
            }
            return results;
        }
    }
}
