# bysykkel.core

Fetches status (bikes/docks available) for Bysykkel in Oslo, and displays them
in a table an on a map. The table and map are linked, so clicking on a station
in the table will pan to the station in the map. Selecting a station in the map
will highlight the corresponding row in the table.

## Dependencies

To run this application, you need to have [`leiningen`](https://leiningen.org/)
and a `jdk` installed. Both should be available from your favourite package
manager on any decent OS.

It's only tested on `jdk-1.8.0_192` on MacOS, not sure how it runs on jdk-11.

## How to run

`lein fig:build`, then head on over to http://localhost:9500/

## Issues

In recent versions of Safari, the location service is not available when running
over http, only https, and thus the blue marker indicating your position will not
be present.

I haven't bothered giving Google my billing info, so google maps displays an
annoying alert, and also shows a "For development purposes only" overlay of the map


## License

Copyright © 2018 Erik Assum

Distributed under the Eclipse Public License either version 1.0 or (at your option) any later version.
