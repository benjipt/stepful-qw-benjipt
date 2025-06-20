# Simulates network lag by sleeping for a set duration on every request
class NetworkLagSimulator
  def initialize(app)
    @app = app
  end

  def call(env)
    lag = (ENV['SIMULATED_NETWORK_LAG'] || 0.5).to_f
    sleep lag
    @app.call(env)
  end
end
