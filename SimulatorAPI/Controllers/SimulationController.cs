using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SimulatorAPI.Models;
using SimulatorAPI.Services;

namespace SimulatorAPI.Controllers
{
    [Route("api/")]
    [ApiController]
    public class SimulationController : ControllerBase
    {
        private readonly SimulatorService simulatorService = new();

        [HttpPost("simulator/start")]
        public IActionResult SimulateMontyHallGames([FromBody] SimulationInput simulationInput)
        {
            if (simulationInput == null)
            {
                return BadRequest("Invalid simulation input.");
            }
            var simulationOutput = simulatorService.GenerateSimulatorOutput(simulationInput);
            return Ok(simulationOutput);
        }

        
    }
}
