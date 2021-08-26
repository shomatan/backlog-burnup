# Backlog Burn Up

## Setup

### Install dependencies
    yarn

### Add .env.local
- Add `.env.local` by copying from `.env.example`
- Add your Backlog project information in `.env.local`

## Run
    yarn dev

Go to `http://localhost:3000/test`

## How it works

### Milestones
- Sprint milestone
  - Each sprint milestones should contain `Sprint` in its name
  - Set begin and end date to each sprint milestones. It helps to show Burn-up Chart properly.
  - To expand the Burn Up Chart period to know when achieve the total story point, need to create enough sprint milestones. 
- Release milestone
  - Release milestone should contain `Release` in its name.

### Issues
All issues should have two milestones, release milestone and sprint milestone.

> e.g `Issue A` has `Example project - Release` and `Example project - Sprint #1` milestones.
