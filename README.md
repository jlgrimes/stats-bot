# stats-bot

Bot for PokeStats tournaments

## Procedure

Every tournament will run with the following procedure:

1. Users register for the tournament using [`!register`](#!register) inside of the respective text channel.
2. Admins run [`!paid`](#!paid) for every user that has paid.
3. Admin runs [`!start`](#!start) inside of the respective text channel to start the tournament. Pairings are DMd to everyone.
4. Users report their match results with [`!report`](#!report) (both users must report the match for the match to count as valid)
5. If anyone drops, admins can run [`!drop`](#!drop) to drop the player from the tournament.
6. Admin runs [`!next-round`](#!next-round) to start the next round. Repeat steps 4-6 until the tournament is over.
7. Once the last round is reached, the standings will be sent out by the bot in the text channel of the tournament.

## Commands

With a few exceptions, all commands can be run **anywhere** that is either a DM to stats bot (preferred) or in any channel in Pokestats Discord (not preferred). Regardless of where the command is run, responses from the bot will be sent **through direct message to the user**. This is so we can keep the chat clean :)

### User Commands

#### `!register`

**Must be run in a tournament text channel: ex #old-format-4**

Registers a user to the tournament the command is run in. If the user is not in the database, they will receive the following response in a DM from stats bot:

```
Welcome, [discord name]! Please enter in your in game name to continue 
with registration:
```

Once entering their in game name, it will get stored in the database, then the user will receive the following prompt.

This prompt will occur when the user has either entered their in game name for the first time or has run `!register` with their in game name in the database:

```
Thanks for registering for [tournament name], [discord name]!
Please Venmo $3 to @Brian-Chisholm37 to complete your registration.
```

This will enter the user in the database with tag `hasnt-paid`. Once the user has paid, the [admin command `!paid`](#!paid) will flag the user with the tag `paid`, meaning that they are ready to play in the tournament

#### `!report [result]`

Reports the result of your match. Both players must report the **same result** for the match to be considered valid.

`[result]` is the result of the round, and can be one of the following:

* 2-0
* 2-1
* 1-2
* 0-2
* ID or id or tie

Response:

```
Round [round number] reported as [result] against [other player]
```

### Admin Commands

#### `!paid [discord name]`

Flags a user as `paid` in the database. To be run once the user has paid for entry. This will also *automatically assign* the respective tournament’s role to the user.

Response:

```
[discord name] has successfully paid!
```

#### `!start`

**Must be run in a tournament text channel**

Starts the tournament. Everyone who has paid will be in the tournament, everyone who has not paid will not be in the tournament.

Response:
```
Welcome to [tournament name]! There are [number of players] players!

Round 1 Pairings

@j_lancelott vs @leukocyte
...
...
```

#### `!drop [discord name]`

Drops the user from the tournament.

Response:
```
[discord name] dropped
```

#### `!next-round`

Starts the next round of the tournament. If the current round is the last round, ends the tournament.

Response (if there is a next round):

```
Round [round number] Pairings

@j_lancelott vs @leukocyte
...
...
```

Response (if there is no last round):

```
[tournament name] has concluded, thanks for playing!

Standings

                    Record      Resistance      Opp Resistance
1. @j_lancelott     7-0-1       56%             40% 
2. @leukocyte       7-0-1       56%             39.9%
...
...

```