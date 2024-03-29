# Monopoly web project group [24]

## Before you start
Search for the string XX and **replace it with your group number**.

## Parent group
https://git.ti.howest.be/TI/2021-2022/s2/programming-project/projects/group-24

## Remote urls
### Your own project
* https://project-i.ti.howest.be/monopoly-24/
* https://project-i.ti.howest.be/monopoly-24/api/

### Provided API
* https://project-i.ti.howest.be/monopoly-api-spec/


## Please complete the following before committing the final version on the project
Please **add** any **instructions** required to
* Make your application work if applicable
* Be able to test the application (login data)
* View the wireframes

Also clarify
* If there are known **bugs**
* If you haven't managed to finish certain required functionality

## Instructions for local CI testing
You can **run** the validator and Sonar with CSS and JS rules **locally.** There is no need to push to the server to check if you are compliant with our rules. In the interest of sparing the server, please result to local testing as often as possible.

If everyone will push to test, the remote will not last.

Please consult the Sonar guide at [https://git.ti.howest.be/TI/2021-2022/s2/programming-project/documentation/monopoly-documentation/-/blob/main/sonar-guide/Sonar%20guide.md](https://git.ti.howest.be/TI/2021-2022/s2/programming-project/documentation/monopoly-documentation/-/blob/main/sonar-guide/Sonar%20guide.md)

## Client
In order to help you along with planning, we've provided a client roadmap
[https://git.ti.howest.be/TI/2021-2022/s2/programming-project/documentation/monopoly-documentation/-/blob/main/roadmaps/client-roadmap.md](https://git.ti.howest.be/TI/2021-2022/s2/programming-project/documentation/monopoly-documentation/-/blob/main/roadmaps/client-roadmap.md)

## File structure
All files should be places in the `src` directory.

**Do not** change the file structure of the folders outside of that directory. Within, you may do as you please.


## Default files

### CSS
The `reset.css` has aleady been supplied, but it's up to you and your team to add the rest of the styles. Please feel free to split those up in multiple files. We'll handle efficient delivery for products in production in later semesters.

### JavaScript
A demonstration for connecting with the API has already been set up. We urge you to separate your JS files as **atomically as possible**. Add folders as you please.

## Extra tips for CSS Grid
In case you get stuck or confused
https://learncssgrid.com/

And for your convenience, yet use with caution
https://grid.layoutit.com/ 

### known bugs
| Bug behaviour  | How to reproduce  | Why it hasn't been fixed    |
|---|---|---|
| There is a bug where taking mortgage duplicates the property  | click on "take mortgage" under your property  | We don't know how this happens.  |
| Bug where the buy screen appears a second time when you buy or don't buy a property  | land on a property  | We don't know why this happens.  |
|   |   |   |

### Token scheme 
not implemented

### functionality table
|PRIORITY  |ENDPOINT                                                                                                  |Client                | Client           |Server                       | Server                       |
|--------|--------------------------------------------------------------------------------------------------------|----------------------|-----------------|-----------------------------|-----------------------------|
|        |                                                                                                        |Visualize ( HTML/CSS)|Consume API (JS)|Process request (API-Bridge)|Implement Game Rules (logic)|
|        |**General Game and API Info**                                                                               |100%                  |YES/NO           |YES/NO                       |100%                         |
|        |GET /   |                     |               |                             |                             |
|MUSTHAVE|GET /tiles           |          100%            |          YES       |           YES |                       100%      |
|MUSTHAVE|GET /tiles /{tileId}                                                                                    |                100%          |         YES        |                YES               |            100%        |
|        |GET /chance                                                                                             |                 100%     |        YES         |           YES                  |                100%             |
|        |GET /community-chest                                                                                    |              100%        |          YES       |             YES                |                   100%          |
|        |                                                                                                        |                      |                 |                             |                             |
|        |**Managing Games**                                                                                          |                      |                 |                             |                             |
|        |DELETE /games                                         |      0%                |                NO |              YES               |                    100%         |
|MUSTHAVE|GET /games                                                                                              |                100%      |         YES        |              YES              |              100%           |
|        |Additional requirement: with filters                                                                    |               100%       |         YES        |             YES                |                100%             |
|MUSTHAVE|POST /games                                                                                             |          100%            |         YES        |               YES              |                100%             |
|MUSTHAVE|POST /games /{gameId} /players                                                                          |            100%          |          YES       |                YES             |                100%             |
|        |                                                                                                        |                      |                 |                             |                             |
|        |Info                                                                                                    |                      |                 |                             |                             |
|        |GET /games /dummy                                                                                       |               /       |         /        |                 /            |                   /          |
|MUSTHAVE|GET /games /{gameId}                                                                                    |            100%          |       YES         |               YES              |               100%              |
|        |                                                                                                        |                      |                 |                             |                             |
|        |**Turn Management**                                                                                         |                      |                 |                             |                             |
|MUSTHAVE|POST /games /{gameId} /players /{playerName} /dice                                                      |               75%       |        YES         |              YES               |               100%              |
|        |With jail                                                                                               |              100%        |       YES          |               YES              |               100%              |
|MUSTHAVE|POST /games /{gameId} /players /{playerName} /bankruptcy                                                |              40%        |         YES       |            YES                |                 100%            |
|        |Decent distribution of assets                                                                           |               0%       |         NO        |                 NO            |            0%                 |
|        |                                                                                                        |                      |                 |                             |                             |
|        |**Tax Management**                                                                                          |                      |                 |                             |                             |
|        |POST /games /{gameId} /players /{playerName} /tax /estimate                                             |                100%      |          YES       |                YES             |                100%             |
|        |POST /games /{gameId} /players /{playerName} /tax /compute                                              |                 100%     |         YES        |               YES              |                 80%            |
|        |                                                                                                        |                      |                 |                             |                             |
|        |**Buying property**                                                                                        |                      |                 |                             |                             |
|MUSTHAVE|POST /games /{gameId} /players /{playerName} /properties /{propertyName}                                |          90%            |    YES            |             YES                |           100%                  |
|MUSTHAVE|DELETE /games /{gameId} /players /{playerName} /properties /{propertyName}                              |              100%        |         YES        |             YES                |             100%                |
|        |With 1 bank auction                                                                                     |                    0%  |         NO        |                YES             |                  100%           |
|        |                                                                                                        |                      |                 |                             |                             |
|        |**Improving property**                                                                                      |                      |                 |                             |                             |
|        |POST /games /{gameId} /players /{playerName} /properties /{propertyName} /houses                        |              60%        |        YES        |             NO                |          0%                   |
|        |DELETE /games /{gameId} /players /{playerName} /properties /{propertyName} /houses                      |               0%       |        NO         |                 NO            |             0%                  |
|        |POST /games /{gameId} /players /{playerName} /properties /{propertyName} /hotel                         |              60%        |        YES         |                 NO            |              0%                  |
|        |DELETE /games /{gameId} /players /{playerName} /properties /{propertyName} /hotel                       |               0%       |         NO        |                NO             |              0%                  |
|        |                                                                                                        |                      |                 |                             |                             |
|        |**Mortgage**                                                                                                |                      |                 |                             |                             |
|        |POST /games /{gameId} /players /{playerName} /properties /{propertyName} /mortgage                      |               80%       |          YES       |            YES                 |              100%               |
|        |DELETE /games /{gameId} /players /{playerName} /properties /{propertyName} /mortgage|        0%              |         NO        |               YES              |              100%               |
|        |                                                                                                        |                      |                 |                             |                             |
|        |**Interaction with another player**                                                                         |                      |                 |                             |                             |
|MUSTHAVE|DELETE /games /{gameId} /players /{playerName} /properties /{propertyName} /visitors /{debtorName} /rent|             0%         |          NO       |                YES             |             100%                |
|        |With potential debt    |         0%             |        NO         |                       YES      |             100%                |
|        |                                                                                                        |                      |                 |                             |                             |
|        |**Prison**                                                                                                  |                      |                 |                             |                             |
|        |POST /games /{gameId} /prison /{playerName} /fine                                                       |                100%      |        YES         |               YES              |            100%                 |
|        |POST /games /{gameId} /prison /{playerName} /free  |         100%             |              YES   |                  YES           |                100%             |
|        |                                                                                                        |                      |                 |                             |                             |
|        |**Auctions**                                                                                                |                      |                 |                             |                             |
|        |GET /games /{gameId} /bank /auctions                                                                    |               0%      |        NO         |              YES               |             100%               |
|        |POST /games /{gameId} /bank /auctions /{propertyName} /bid                                              |              0%       |          NO       |                YES             |               100%s              |

