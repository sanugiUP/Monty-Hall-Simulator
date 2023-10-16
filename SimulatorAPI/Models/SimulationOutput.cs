namespace SimulatorAPI.Models
{
    public class SimulationOutput
    {
        public SimulationInput? UserInput { get; set; }
        public double WinRate { get; set; } = 0.0;
        public double LossRate { get; set; } = 0.0;
    }
}
